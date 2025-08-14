import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { useComponentStyles } from '@/hooks/useComponentStyles';

interface ListItemData {
  id: string | number;
  avatar?: React.ReactNode;
  primary: string;
  secondary?: string;
  value?: string | number;
  valueColor?: string;
  valueSubtext?: string;
  valueSubtextColor?: string;
  trend?: React.ReactNode;
}

interface ListCardProps {
  data: ListItemData[];
  divider?: boolean;
}

/**
 * ListCard component
 *
 * A reusable component for displaying lists of data with consistent styling
 *
 * @example
 * ```tsx
 * <ListCard
 *   data={[
 *     {
 *       id: '1',
 *       avatar: <Avatar>BTC</Avatar>,
 *       primary: 'Bitcoin',
 *       secondary: 'BTC/USD',
 *       value: '$61,234.52',
 *       trend: <TrendingUp />,
 *       valueSubtext: '+2.4%',
 *       valueSubtextColor: 'success.main'
 *     }
 *   ]}
 *   divider={true}
 * />
 * ```
 */
export function ListCard({ data, divider = true }: ListCardProps) {
  const styles = useComponentStyles();

  return (
    <List disablePadding>
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          <ListItem
            sx={{
              py: 1.5,
              px: 0,
              ...(divider &&
                index !== data.length - 1 && {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }),
            }}
          >
            {item.avatar && <ListItemAvatar>{item.avatar}</ListItemAvatar>}

            <ListItemText primary={item.primary} secondary={item.secondary} />

            <Box sx={styles.flexColumn}>
              <Typography
                fontWeight="bold"
                color={item.valueColor || 'text.primary'}
                sx={{
                  textAlign: 'right',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                {item.value}
              </Typography>

              {item.valueSubtext && (
                <Typography
                  variant="body2"
                  color={item.valueSubtextColor || 'text.secondary'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  {item.trend}
                  {item.valueSubtext}
                </Typography>
              )}
            </Box>
          </ListItem>

          {divider && index !== data.length - 1 && !item.avatar && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}
