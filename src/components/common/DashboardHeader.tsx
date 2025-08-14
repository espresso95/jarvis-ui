import { Box, Alert, Typography } from '@mui/material';

interface DashboardHeaderProps {
  title: string;
  marketStatus?: string;
  lastUpdate?: string;
}

/**
 * DashboardHeader component
 *
 * A header component for dashboard pages with optional market status information.
 *
 * @example
 * ```tsx
 * <DashboardHeader
 *   title="Trading Dashboard"
 *   marketStatus="Open"
 *   lastUpdate="April 21, 2025 12:34 PM"
 * />
 * ```
 */
export function DashboardHeader({
  title,
  marketStatus = 'Open',
  lastUpdate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }),
}: DashboardHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 3,
      }}
    >
      <Typography variant="h4" component="h1" fontWeight="bold">
        {title}
      </Typography>

      <Alert
        severity="info"
        icon={false}
        sx={{
          borderRadius: 2,
          py: 0.5,
          '& .MuiAlert-message': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <Box component="span" fontWeight="fontWeightMedium" mr={1}>
          Market Status:
        </Box>
        {marketStatus} • Last Update: {lastUpdate}
      </Alert>
    </Box>
  );
}
