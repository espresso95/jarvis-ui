import { Box } from '@mui/material';
import { MarketDataFeedControllerGetSnapshotPeriodEnum } from 'src/api';
import CoinPriceChart from 'src/components/market-data/CoinPriceChart';

export default function OneMinuteChart() {
  return (
    <Box sx={{ py: 4 }}>
      <CoinPriceChart
        coin="solana"
        timeRange={MarketDataFeedControllerGetSnapshotPeriodEnum._1m}
        height={400}
      />
    </Box>
  );
}
