import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useComponentStyles } from '@/hooks/useComponentStyles';
import { StatusIndicator } from './StatusIndicator';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

/**
 * StatCard component
 *
 * A reusable component for displaying statistical cards throughout the application
 *
 * @example
 * ```tsx
 * <StatCard
 *   title="Total Balance"
 *   value="$125,800"
 *   trend="up"
 *   trendValue="3.5% (24h)"
 * />
 * ```
 */
export function StatCard({
  title,
  value,
  trend = 'neutral',
  trendValue,
  subtitle,
  icon,
}: StatCardProps) {
  const styles = useComponentStyles();

  return (
    <Paper
      elevation={1}
      sx={{
        ...styles.card,
        p: 2,
        borderRadius: 3,
      }}
    >
      <Box sx={styles.flexBetween}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {icon && <Box sx={{ color: 'text.secondary' }}>{icon}</Box>}
      </Box>

      <Typography variant="h5" component="p" fontWeight="bold">
        {value}
      </Typography>

      {trendValue && <StatusIndicator value={trendValue} trend={trend} />}

      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
}
