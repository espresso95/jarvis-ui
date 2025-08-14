import { BotEntityDto, BotStatus } from 'src/api';
import {
  Box,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Button } from '../common/ButtonComponent';

interface BotListProps {
  bots: BotEntityDto[];
  isLoading: boolean;
  onSelectBot: (botId: string) => void;
  onToggleStatus: (bot: BotEntityDto, e: React.MouseEvent) => void;
}

export function BotList({
  bots,
  isLoading,
  onSelectBot,
  onToggleStatus,
}: BotListProps) {
  if (isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress size={24} sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Loading bots...
        </Typography>
      </Box>
    );
  }

  if (bots.length === 0) {
    return (
      <Box textAlign="center" py={4} color="text.secondary">
        No bots found. Create your first trading bot to get started.
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}
    >
      {bots.map((bot) => (
        <Paper
          key={bot.id}
          onClick={() => onSelectBot(bot.id)}
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 3,
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {bot.name}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <BotStatusBadge status={bot.status} />
            <Button
              variant="text"
              size="small"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(bot, e);
              }}
              sx={{ minWidth: 'auto', p: 0.5 }}
            >
              {bot.status === BotStatus.Active
                ? 'Pause'
                : bot.status === BotStatus.Paused
                  ? 'Resume'
                  : bot.status === BotStatus.Stopped
                    ? 'Start'
                    : 'View'}
            </Button>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              fontSize: '0.75rem',
              color: 'text.secondary',
            }}
          >
            <Typography variant="caption">
              Market: {bot.marketPairs[0]}
            </Typography>
            <Typography variant="caption">
              Created: {new Date(bot.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

// Helper component for bot status badge
interface BotStatusBadgeProps {
  status: BotStatus;
}

export function BotStatusBadge({ status }: BotStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case BotStatus.Active:
        return 'success';
      case BotStatus.Paused:
        return 'warning';
      case BotStatus.Stopped:
        return 'default';
      default:
        return 'error';
    }
  };

  return (
    <Chip
      label={status}
      color={getStatusColor()}
      size="small"
      variant="outlined"
    />
  );
}
