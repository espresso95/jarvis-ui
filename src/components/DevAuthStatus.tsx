import React from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';

/**
 * Development authentication status component
 * Only visible in development mode
 */
export const DevAuthStatus: React.FC = () => {
  const { tokens, loading, error } = useAuth();
  const isDev = import.meta.env.DEV;

  // Only show in development
  if (!isDev) return null;

  const isConfigured = !!(
    import.meta.env.VITE_COGNITO_USER_POOL_ID &&
    import.meta.env.VITE_COGNITO_CLIENT_ID
  );

  const getStatusColor = () => {
    if (loading) return 'warning';
    if (error) return 'error';
    if (tokens) return 'success';
    return 'default';
  };

  const getStatusText = () => {
    if (loading) return 'Authenticating...';
    if (error) return 'Auth Error';
    if (tokens) return 'Authenticated';
    return 'Not Authenticated';
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        p: 2,
        minWidth: 250,
        zIndex: 1000,
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontSize: '14px' }}>
        🔧 Dev Auth Status
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Chip
          label={getStatusText()}
          color={getStatusColor() as any}
          size="small"
          variant="outlined"
        />
        
        <Chip
          label={isConfigured ? 'Cognito Configured' : 'Cognito Missing'}
          color={isConfigured ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
        
        {import.meta.env.VITE_DISABLE_AUTH === 'true' && (
          <Chip
            label="Auth Disabled"
            color="warning"
            size="small"
            variant="outlined"
          />
        )}
      </Box>

      {error && (
        <Typography
          variant="caption"
          sx={{ mt: 1, color: 'error.main', fontSize: '10px' }}
        >
          {error}
        </Typography>
      )}

      <Typography
        variant="caption"
        sx={{ mt: 1, display: 'block', fontSize: '10px', opacity: 0.7 }}
      >
        Pool: {import.meta.env.VITE_COGNITO_USER_POOL_ID?.substring(0, 15)}...
      </Typography>
    </Paper>
  );
};
