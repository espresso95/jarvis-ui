import { BotEntityDto, BotStatus } from 'src/api';
import { Box, Paper, Typography, Chip, Stack } from '@mui/material';
import { Button } from '../common/ButtonComponent';

interface BotCardProps {
  bot: BotEntityDto;
  onSelect: () => void;
  onToggleStatus: (bot: BotEntityDto, e: React.MouseEvent) => void;
}

export function BotCard({ bot, onSelect, onToggleStatus }: BotCardProps) {
  const getStatusColor = () => {
    switch (bot.status) {
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

  const getActionText = () => {
    switch (bot.status) {
      case BotStatus.Active:
        return 'Pause';
      case BotStatus.Paused:
        return 'Resume';
      case BotStatus.Stopped:
        return 'Start';
      default:
        return 'View';
    }
  };

  return (
    <Paper
      onClick={onSelect}
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
        <Chip
          label={bot.status}
          color={getStatusColor()}
          size="small"
          variant="outlined"
        />
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
          {getActionText()}
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
        <Typography variant="caption">Market: {bot.marketPairs[0]}</Typography>
        <Typography variant="caption">
          Created: {new Date(bot.createdAt).toLocaleDateString()}
        </Typography>
      </Stack>
    </Paper>
  );
}
