import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useComponentStyles } from '@/hooks/useComponentStyles';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

/**
 * SectionHeader component
 *
 * A reusable component for section headers throughout the application
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Portfolio Overview"
 *   subtitle="Summary of your current investments"
 *   action={<Button>View All</Button>}
 * />
 * ```
 */
export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  const styles = useComponentStyles();

  return (
    <Box sx={styles.section}>
      <Box sx={styles.flexBetween} mb={subtitle ? 1 : 2}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          {title}
        </Typography>
        {action && <Box>{action}</Box>}
      </Box>

      {subtitle && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {subtitle}
        </Typography>
      )}

      <Divider />
    </Box>
  );
}
