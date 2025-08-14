import { ReactNode } from 'react';
import { Box, Typography, Divider } from '@mui/material';

type StatRowProps = {
  label: string;
  value: ReactNode;
  isLast?: boolean;
};

export function StatRow({ label, value, isLast = false }: StatRowProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>

        {typeof value === 'string' ? (
          <Typography variant="body2" fontWeight="medium">
            {value}
          </Typography>
        ) : (
          value
        )}
      </Box>
      {!isLast && <Divider />}
    </>
  );
}
