import { ReactNode } from 'react';
import { Card, CardHeader, CardContent, Box } from '@mui/material';
import { useComponentStyles } from '@/hooks/useComponentStyles';

interface DataCardProps {
  title: string | ReactNode;
  action?: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
  sx?: Record<string, any>;
  headerSx?: Record<string, any>;
}

/**
 * DataCard component
 *
 * A reusable component for displaying data cards with consistent styling
 *
 * @example
 * ```tsx
 * <DataCard
 *   title="Market Overview"
 *   action={<Button>See All</Button>}
 * >
 *   <List>{...content}</List>
 * </DataCard>
 * ```
 */
export function DataCard({
  title,
  action,
  children,
  noPadding = false,
  sx = {},
  headerSx = {},
}: DataCardProps) {
  const styles = useComponentStyles();

  return (
    <Card
      sx={{
        ...styles.card,
        borderRadius: 3,
        height: '100%',
        ...sx,
      }}
    >
      {title && (
        <CardHeader
          title={title}
          action={
            action && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>{action}</Box>
            )
          }
          sx={{
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            ...headerSx,
          }}
        />
      )}

      <CardContent sx={noPadding ? { p: 0 } : {}}>{children}</CardContent>
    </Card>
  );
}
