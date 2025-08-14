import { TradeAnalyticsDto } from 'src/api';
import { formatPercent } from './BotTypes';
import { Box, Typography, Paper, Stack } from '@mui/material';

interface BotPerformanceTabProps {
  performance: TradeAnalyticsDto | null;
}

export function BotPerformanceTab({ performance }: BotPerformanceTabProps) {
  if (!performance) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        No performance data available for this bot yet.
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Bot Performance
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        {/* Trade Statistics */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight="medium">
              Trade Statistics
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
              }}
            >
              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Total Trades
                </Typography>
                <Typography variant="h6" fontWeight="600">
                  {performance.totalTrades}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Win Rate
                </Typography>
                <Typography variant="h6" fontWeight="600">
                  {formatPercent(performance.winRate)}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Profitable
                </Typography>
                <Typography variant="h6" fontWeight="600" color="success.main">
                  {performance.profitableTrades}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Unprofitable
                </Typography>
                <Typography variant="h6" fontWeight="600" color="error.main">
                  {performance.unprofitableTrades}
                </Typography>
              </Paper>
            </Box>
          </Stack>
        </Box>

        {/* Profit & Loss */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight="medium">
              Profit & Loss
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
              }}
            >
              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Total P&L
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={
                    performance.totalPnl >= 0 ? 'success.main' : 'error.main'
                  }
                >
                  {performance.totalPnl.toFixed(2)} USDC
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Average P&L
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color={
                    performance.averagePnl >= 0 ? 'success.main' : 'error.main'
                  }
                >
                  {performance.averagePnl.toFixed(2)} USDC
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Best Trade
                </Typography>
                <Typography variant="h6" fontWeight="600" color="success.main">
                  {performance.largestProfit.toFixed(2)} USDC
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Worst Trade
                </Typography>
                <Typography variant="h6" fontWeight="600" color="error.main">
                  {performance.largestLoss.toFixed(2)} USDC
                </Typography>
              </Paper>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
