import { Box, Typography, BoxProps } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

type Trend = 'up' | 'down' | 'neutral';

interface StatusIndicatorProps extends BoxProps {
  value: string | number;
  trend?: Trend;
  label?: string;
  percentChange?: number;
}

/**
 * StatusIndicator component
 *
 * A reusable component for displaying status metrics with trend indicators
 *
 * @example
 * ```tsx
 * <StatusIndicator
 *   value="$5,234"
 *   trend="up"
 *   percentChange={12.5}
 *   label="since last month"
 * />
 * ```
 */
export function StatusIndicator({
  value,
  trend = 'neutral',
  label,
  percentChange,
  ...boxProps
}: StatusIndicatorProps) {
  const getColor = () => {
    if (trend === 'up') return 'success.main';
    if (trend === 'down') return 'error.main';
    return 'text.secondary';
  };

  const getIcon = () => {
    if (trend === 'up') return <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />;
    if (trend === 'down')
      return <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />;
    return null;
  };

  return (
    <Box {...boxProps}>
      <Typography variant="h5" component="p" fontWeight="bold">
        {value}
      </Typography>

      {(percentChange !== undefined || label) && (
        <Typography
          variant="body2"
          color={getColor()}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {getIcon()}
          {percentChange !== undefined &&
            `${percentChange > 0 ? '+' : ''}${percentChange}%`}
          {label && ` ${label}`}
        </Typography>
      )}
    </Box>
  );
}
