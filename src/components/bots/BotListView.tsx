import { BotEntityDto } from 'src/api';
import { BotCard } from './BotCard';
import { Box, Typography } from '@mui/material';
import { Button } from '../common/ButtonComponent';
import AddIcon from '@mui/icons-material/Add';

interface BotListViewProps {
  bots: BotEntityDto[];
  isLoading: boolean;
  onBotSelect: (botId: string) => void;
  onCreateBot: () => void;
  onToggleStatus: (bot: BotEntityDto, e: React.MouseEvent) => void;
}

export function BotListView({
  bots,
  isLoading,
  onBotSelect,
  onCreateBot,
  onToggleStatus,
}: BotListViewProps) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Trading Bots
        </Typography>
        <Button
          variant="contained"
          onClick={onCreateBot}
          startIcon={<AddIcon />}
        >
          Create Bot
        </Button>
      </Box>
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
        {bots.length === 0 && !isLoading && (
          <Box
            sx={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              py: 4,
              color: 'text.secondary',
            }}
          >
            No bots found. Create your first trading bot to get started.
          </Box>
        )}

        {bots.map((bot) => (
          <Box key={bot.id}>
            <BotCard
              bot={bot}
              onSelect={() => onBotSelect(bot.id)}
              onToggleStatus={onToggleStatus}
            />
          </Box>
        ))}
      </Box>
    </>
  );
}
