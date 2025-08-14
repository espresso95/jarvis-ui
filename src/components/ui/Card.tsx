import { ReactNode } from 'react';
import { Paper, Typography, Box, Divider, SxProps, Theme } from '@mui/material';

type CardProps = {
  children: ReactNode;
  title?: ReactNode;
  noPadding?: boolean;
  sx?: SxProps<Theme>;
};

export function Card({ children, title, noPadding = false, sx }: CardProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {title && (
        <>
          <Box sx={{ px: 2, py: 1.5 }}>
            {typeof title === 'string' ? (
              <Typography variant="h6" fontWeight="medium">
                {title}
              </Typography>
            ) : (
              title
            )}
          </Box>
          <Divider />
        </>
      )}
      <Box sx={{ p: noPadding ? 0 : 2 }}>{children}</Box>
    </Paper>
  );
}
