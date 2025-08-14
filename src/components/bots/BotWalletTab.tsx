import { WalletSnapshotResponseDto } from 'src/api';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { ChartDataPoint, GenericPriceChart } from '../PriceChart';

interface BotWalletTabProps {
  snapshots: WalletSnapshotResponseDto[] | null;
}

export function BotWalletTab({ snapshots }: BotWalletTabProps) {
  const [timeRange, setTimeRange] = useState<string>('7d');

  // Handle no data case
  if (!snapshots || snapshots.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        No wallet data available for this bot yet.
      </Box>
    );
  }

  // Sort snapshots by timestamp in ascending order for the chart
  const sortedSnapshots = [...snapshots].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  // Get the filtered snapshots based on timeRange
  const filteredSnapshots = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case '24h':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case 'all':
        // Return all snapshots
        return sortedSnapshots;
      default:
        startDate.setDate(now.getDate() - 7); // Default to 7 days
    }

    return sortedSnapshots.filter(
      (snapshot) => new Date(snapshot.timestamp) >= startDate,
    );
  }, [sortedSnapshots, timeRange]);

  // Calculate the metrics from the most recent snapshot
  const latestSnapshot = sortedSnapshots[sortedSnapshots.length - 1];

  // Prepare data for the chart
  const walletValueChartData: ChartDataPoint[] = filteredSnapshots.map(
    (snapshot) => ({
      timestamp: new Date(snapshot.timestamp),
      value: snapshot.walletValue,
    }),
  );

  const cashBalanceChartData: ChartDataPoint[] = filteredSnapshots.map(
    (snapshot) => ({
      timestamp: new Date(snapshot.timestamp),
      value: snapshot.cashBalance,
    }),
  );

  const positionsValueChartData: ChartDataPoint[] = filteredSnapshots.map(
    (snapshot) => ({
      timestamp: new Date(snapshot.timestamp),
      value: snapshot.positionsValue,
    }),
  );

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as string);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h6" component="h2">
          Wallet Snapshot
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="time-range-select-label">Time Range</InputLabel>
          <Select
            labelId="time-range-select-label"
            value={timeRange}
            label="Time Range"
            onChange={handleTimeRangeChange}
          >
            <MenuItem value="24h">Last 24 Hours</MenuItem>
            <MenuItem value="7d">Last 7 Days</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Wallet Summary Metrics */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            minWidth: '180px',
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total Wallet Value
          </Typography>
          <Typography variant="h6" fontWeight="600">
            ${latestSnapshot.walletValue.toFixed(2)}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            minWidth: '180px',
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Available Cash
          </Typography>
          <Typography variant="h6" fontWeight="600">
            ${latestSnapshot.cashBalance.toFixed(2)}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            minWidth: '180px',
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Positions Value
          </Typography>
          <Typography variant="h6" fontWeight="600">
            ${latestSnapshot.positionsValue.toFixed(2)}
          </Typography>
        </Paper>

        {latestSnapshot.pnl !== undefined && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              flex: 1,
              minWidth: '180px',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Profit & Loss
            </Typography>
            <Typography
              variant="h6"
              fontWeight="600"
              color={latestSnapshot.pnl >= 0 ? 'success.main' : 'error.main'}
            >
              ${latestSnapshot.pnl.toFixed(2)}
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Wallet Value Chart */}
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Wallet Value Over Time
          </Typography>
          <GenericPriceChart
            data={walletValueChartData}
            height={300}
            colorSettings={{
              lineColor: '#2962FF',
              areaColor: '#2962FF',
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Cash Balance
            </Typography>
            <GenericPriceChart
              data={cashBalanceChartData}
              height={250}
              colorSettings={{
                lineColor: '#10B981',
                areaColor: '#10B981',
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Positions Value
            </Typography>
            <GenericPriceChart
              data={positionsValueChartData}
              height={250}
              colorSettings={{
                lineColor: '#F59E0B',
                areaColor: '#F59E0B',
              }}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
