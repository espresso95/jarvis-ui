import { Alert, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
