import React, { createContext, useContext } from 'react';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { useCognitoAuth } from '../hooks/useCognitoAuth';

/** Whether authentication is disabled via environment variable */
const AUTH_DISABLED = import.meta.env.VITE_DISABLE_AUTH === 'true';

/**
 * Shape of the authentication context exposed to components.
 */
type AuthContextValue = {
  /** Cognito tokens for the authenticated user */
  tokens: AuthenticationResultType | null;
  /** Function to initiate the login flow */
  login: () => Promise<void>;
  /** Indicates that a login request is in progress */
  loading: boolean;
  /** Error message from the last login attempt */
  error: string | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Provider component that makes authentication state available via context.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isDev = import.meta.env.DEV;
  const [{ tokens, loading, error }, login] = AUTH_DISABLED
    ? [{ tokens: null, loading: false, error: null }, async () => {}]
    : useCognitoAuth();

  // Development logging for auth state changes
  React.useEffect(() => {
    if (isDev) {
      console.group('🔐 Auth State Change');
      console.log('Tokens:', tokens ? 'Present' : 'None');
      console.log('Loading:', loading);
      console.log('Error:', error);
      console.log('Auth Disabled:', AUTH_DISABLED);
      console.groupEnd();
    }
  }, [tokens, loading, error, isDev]);

  return (
    <AuthContext.Provider value={{ tokens, login, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Convenience hook to access the authentication context.
 *
 * @throws if called outside of an `AuthProvider`.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext not available');
  return ctx;
}
