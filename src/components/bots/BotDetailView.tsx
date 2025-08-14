import { BotEntityDto, BotStatus } from 'src/api';
import { BotStatusBadge } from './BotList';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import {
  Button,
  DangerButton,
  SuccessButton,
  WarningButton,
} from '../common/ButtonComponent';

type TabType = 'performance' | 'settings' | 'trades' | 'wallet';

interface BotDetailViewProps {
  bot: BotEntityDto;
  isLoading: boolean;
  onBack: () => void;
  onToggleStatus: (bot: BotEntityDto, e: React.MouseEvent) => void;
  onStopBot: (botId: string) => void;
  onTabChange: (tab: string) => void;
  activeTab: TabType;
  children: React.ReactNode;
}

export function BotDetailView({
  bot,
  isLoading,
  onBack,
  onToggleStatus,
  onStopBot,
  onTabChange,
  activeTab,
  children,
}: BotDetailViewProps) {
  return (
    <>
      <Box mb={3}>
        <Button
          variant="text"
          onClick={onBack}
          startIcon={<ArrowBack />}
          sx={{ color: 'primary.main' }}
        >
          Back to Bot List
        </Button>
      </Box>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" component="h1" fontWeight="bold">
            {bot.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <BotStatusBadge status={bot.status} />
            <Stack direction="row" spacing={1}>
              {bot.status === BotStatus.Active && (
                <WarningButton
                  size="small"
                  onClick={(e) => onToggleStatus(bot, e)}
                >
                  Pause
                </WarningButton>
              )}
              {bot.status === BotStatus.Paused && (
                <SuccessButton
                  size="small"
                  onClick={(e) => onToggleStatus(bot, e)}
                >
                  Resume
                </SuccessButton>
              )}
              {bot.status === BotStatus.Stopped && (
                <SuccessButton
                  size="small"
                  onClick={(e) => onToggleStatus(bot, e)}
                >
                  Start
                </SuccessButton>
              )}
              {bot.status !== BotStatus.Stopped && (
                <DangerButton size="small" onClick={() => onStopBot(bot.id)}>
                  Stop
                </DangerButton>
              )}
            </Stack>
          </Stack>
        </Box>

        <Box mb={3} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
          <Box>Market Pairs: {bot.marketPairs.join(', ')}</Box>
          <Box>Created: {new Date(bot.createdAt).toLocaleDateString()}</Box>
          <Box>
            Last Updated: {new Date(bot.updatedAt).toLocaleDateString()}
          </Box>
          <Box>Description: {bot.description}</Box>
        </Box>

        {/* Bot tabs navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant={activeTab === 'performance' ? 'contained' : 'text'}
              onClick={() => onTabChange('performance')}
              size="small"
              sx={{
                minWidth: 'auto',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'none',
              }}
            >
              Performance
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'contained' : 'text'}
              onClick={() => onTabChange('settings')}
              size="small"
              sx={{
                minWidth: 'auto',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'none',
              }}
            >
              Trading Strategy
            </Button>
            <Button
              variant={activeTab === 'trades' ? 'contained' : 'text'}
              onClick={() => onTabChange('trades')}
              size="small"
              sx={{
                minWidth: 'auto',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'none',
              }}
            >
              Trades
            </Button>
            <Button
              variant={activeTab === 'wallet' ? 'contained' : 'text'}
              onClick={() => onTabChange('wallet')}
              size="small"
              sx={{
                minWidth: 'auto',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'none',
              }}
            >
              Wallet
            </Button>
          </Stack>
        </Box>

        {/* Tab content rendered as children */}
        {isLoading ? (
          <Box py={2} textAlign="center">
            Loading data...
          </Box>
        ) : (
          children
        )}
      </Paper>
    </>
  );
}
