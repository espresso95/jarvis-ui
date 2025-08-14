import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider';
import { createLoginMessage } from 'solana-wallet-login';

/**
 * Authentication state returned by {@link useCognitoAuth}.
 */
interface AuthState {
  /** AWS Cognito authentication tokens */
  tokens: AuthenticationResultType | null;
  /** Indicates whether an authentication request is in progress */
  loading: boolean;
  /** Error message from the last authentication attempt */
  error: string | null;
}

/**
 * React hook to authenticate a connected Solana wallet with AWS Cognito.
 *
 * The hook automatically attempts to login whenever the wallet connects and
 * exposes the current authentication state and a `login` function.
 *
 * @returns A tuple with the auth state and a function to trigger login.
 */
export function useCognitoAuth(): [AuthState, () => Promise<void>] {
  const { publicKey, signMessage } = useWallet();
  const [state, setState] = useState<AuthState>({
    tokens: null,
    loading: false,
    error: null,
  });

  const login = useCallback(async () => {
    if (!publicKey || !signMessage) {
      setState((s) => ({ ...s, error: 'Wallet not connected' }));
      return;
    }

    const client = new CognitoIdentityProviderClient({
      region: import.meta.env.VITE_COGNITO_REGION,
    });

    try {
      setState({ tokens: null, loading: true, error: null });
      const username = publicKey.toBase58();
      const init = await client.send(
        new InitiateAuthCommand({
          AuthFlow: 'CUSTOM_AUTH',
          ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
          AuthParameters: { USERNAME: username },
        }),
      );
      const nonce = init.ChallengeParameters?.nonce;
      if (!nonce) throw new Error('No challenge nonce');

      const message = createLoginMessage(username, nonce);
      const signature = await signMessage(new TextEncoder().encode(message));
      const sigStr = bs58.encode(signature);

      const resp = await client.send(
        new RespondToAuthChallengeCommand({
          ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
          ChallengeName: 'CUSTOM_CHALLENGE',
          Session: init.Session,
          ChallengeResponses: {
            USERNAME: username,
            ANSWER: sigStr,
          },
        }),
      );
      setState({
        tokens: resp.AuthenticationResult ?? null,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setState({ tokens: null, loading: false, error: err.message });
      console.error('Cognito login failed', err);
    }
  }, [publicKey, signMessage]);

  useEffect(() => {
    if (
      publicKey &&
      signMessage &&
      !state.tokens &&
      !state.loading &&
      !state.error
    ) {
      login();
    }
  }, [publicKey, signMessage, state.tokens, state.loading, state.error, login]);

  return [state, login];
}
