import {
  CreateBotDto,
  InMemoryWalletConfigDto,
  SolanaWalletConfigDto,
} from 'src/api';
import { createWalletConfig } from './BotTypes';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

interface WalletConfigFormProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

export function WalletConfigForm({ botDto, onChange }: WalletConfigFormProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  // Helper functions to extract values from the DTO
  const getWalletType = (): 'in-memory' | 'solana-wallet' => {
    return (
      (botDto.walletConfig?.type as 'in-memory' | 'solana-wallet') ||
      'in-memory'
    );
  };

  const getInitialCash = (): number => {
    if (botDto.walletConfig?.type === 'in-memory') {
      const memoryWallet = botDto.walletConfig as InMemoryWalletConfigDto;
      return memoryWallet.options?.initialCash || 1000;
    }
    return 1000;
  };

  const getSolanaPrivateKey = (): string => {
    if (botDto.walletConfig?.type === 'solana-wallet') {
      const solanaWallet = botDto.walletConfig as SolanaWalletConfigDto;
      return solanaWallet.options?.privateKey || '';
    }
    return '';
  };

  const getSolanaRpcUrl = (): string => {
    if (botDto.walletConfig?.type === 'solana-wallet') {
      const solanaWallet = botDto.walletConfig as SolanaWalletConfigDto;
      return (
        solanaWallet.options?.rpcUrl || 'https://api.mainnet-beta.solana.com'
      );
    }
    return 'https://api.mainnet-beta.solana.com';
  };

  const getSolanaSyncInterval = (): number => {
    if (botDto.walletConfig?.type === 'solana-wallet') {
      const solanaWallet = botDto.walletConfig as SolanaWalletConfigDto;
      return solanaWallet.options?.syncIntervalMs || 60000;
    }
    return 60000;
  };

  // Handle form field changes
  const handleWalletTypeChange = (
    walletType: 'in-memory' | 'solana-wallet',
  ) => {
    const updatedBot = { ...botDto };

    if (walletType === 'in-memory') {
      updatedBot.walletConfig = createWalletConfig('in-memory', {
        initialCash: getInitialCash(),
      });
    } else {
      updatedBot.walletConfig = createWalletConfig('solana-wallet', {
        privateKey: getSolanaPrivateKey(),
        rpcUrl: getSolanaRpcUrl(),
        syncIntervalMs: getSolanaSyncInterval(),
      });
    }

    onChange(updatedBot);
  };

  const handleInitialCashChange = (initialCash: number) => {
    const updatedBot = { ...botDto };
    updatedBot.walletConfig = createWalletConfig('in-memory', {
      initialCash,
    });
    onChange(updatedBot);
  };

  const handleSolanaPrivateKeyChange = (privateKey: string) => {
    const updatedBot = { ...botDto };
    updatedBot.walletConfig = createWalletConfig('solana-wallet', {
      privateKey,
      rpcUrl: getSolanaRpcUrl(),
      syncIntervalMs: getSolanaSyncInterval(),
    });
    onChange(updatedBot);
  };

  const handleSolanaRpcUrlChange = (rpcUrl: string) => {
    const updatedBot = { ...botDto };
    updatedBot.walletConfig = createWalletConfig('solana-wallet', {
      privateKey: getSolanaPrivateKey(),
      rpcUrl,
      syncIntervalMs: getSolanaSyncInterval(),
    });
    onChange(updatedBot);
  };

  const handleSolanaSyncIntervalChange = (syncIntervalMs: number) => {
    const updatedBot = { ...botDto };
    updatedBot.walletConfig = createWalletConfig('solana-wallet', {
      privateKey: getSolanaPrivateKey(),
      rpcUrl: getSolanaRpcUrl(),
      syncIntervalMs,
    });
    onChange(updatedBot);
  };

  return (
    <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Wallet Configuration
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="wallet-type-label">Wallet Type</InputLabel>
            <Select
              labelId="wallet-type-label"
              id="wallet-type"
              value={getWalletType()}
              label="Wallet Type"
              onChange={(e) =>
                handleWalletTypeChange(
                  e.target.value as 'in-memory' | 'solana-wallet',
                )
              }
            >
              <MenuItem value="in-memory">
                In-memory Wallet (Simulation)
              </MenuItem>
              <MenuItem value="solana-wallet">
                Solana Wallet (Real Trading)
              </MenuItem>
            </Select>
          </FormControl>

          {getWalletType() === 'in-memory' ? (
            <TextField
              fullWidth
              label="Initial Capital (USDC)"
              type="number"
              value={getInitialCash()}
              onChange={(e) => handleInitialCashChange(Number(e.target.value))}
              inputProps={{ min: 100, step: 100 }}
            />
          ) : (
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Private Key"
                type={showPrivateKey ? 'text' : 'password'}
                value={getSolanaPrivateKey()}
                onChange={(e) => handleSolanaPrivateKeyChange(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                        edge="end"
                      >
                        {showPrivateKey ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="RPC URL"
                value={getSolanaRpcUrl()}
                onChange={(e) => handleSolanaRpcUrlChange(e.target.value)}
              />

              <TextField
                fullWidth
                label="Sync Interval (ms)"
                type="number"
                value={getSolanaSyncInterval()}
                onChange={(e) =>
                  handleSolanaSyncIntervalChange(Number(e.target.value))
                }
                inputProps={{ min: 1000, step: 1000 }}
              />
            </Stack>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: 1,
            borderColor: 'divider',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Wallet Information
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {getWalletType() === 'in-memory'
              ? 'In-memory wallets are simulated wallets for testing trading strategies without using real funds.'
              : 'Solana wallets connect to the Solana blockchain for real trading with actual cryptocurrency.'}
          </Typography>

          {getWalletType() === 'solana-wallet' && (
            <Typography variant="caption" color="warning.main">
              Warning: Never share your private keys. Make sure you're using a
              development wallet with limited funds.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
