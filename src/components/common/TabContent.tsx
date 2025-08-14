import { Box, CircularProgress, Typography } from '@mui/material';

interface TabContentProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingMessage?: string;
}

export function TabContent({
  isLoading,
  children,
  loadingMessage = 'Loading data...',
}: TabContentProps) {
  if (isLoading) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {loadingMessage}
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
