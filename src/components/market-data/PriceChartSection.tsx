// MUI version of PriceChartSection
import { Card } from '@/components/ui/Card';
import CoinPriceChart from '@/components/market-data/CoinPriceChart';
import { CoinId } from '@/types/market';
import { MarketDataFeedControllerGetSnapshotPeriodEnum } from 'src/api';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Avatar,
  Grid,
} from '@mui/material';

type TimeRangeOption = {
  value: MarketDataFeedControllerGetSnapshotPeriodEnum;
  label: string;
};

type PriceChartSectionProps = {
  selectedCoin: CoinId;
  coinName: string;
  coinIconClass: string;
  timeRange: MarketDataFeedControllerGetSnapshotPeriodEnum;
  timeRangeOptions: TimeRangeOption[];
  price: number;
  isLoading: boolean;
  onTimeRangeChange: (
    range: MarketDataFeedControllerGetSnapshotPeriodEnum,
  ) => void;
};

export function PriceChartSection({
  selectedCoin,
  coinName,
  coinIconClass,
  timeRange,
  timeRangeOptions,
  price,
  isLoading,
  onTimeRangeChange,
}: PriceChartSectionProps) {
  const getCoinSymbol = (coin: CoinId): string => {
    const symbols: Record<CoinId, string> = {
      solana: '◎',
      jupiter: 'J',
      trump: 'T',
      render: 'R',
      bonk: 'B',
    };
    return symbols[coin];
  };

  const chartHeader = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="h6"
        sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
      >
        <Avatar
          sx={{
            height: 24,
            width: 24,
            borderRadius: '50%',
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
          className={coinIconClass}
        >
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            {getCoinSymbol(selectedCoin)}
          </Typography>
        </Avatar>
        {coinName} Price Chart
      </Typography>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'grey.100',
          borderRadius: 2,
          p: 0.5,
          display: 'flex',
          gap: 0.5,
        }}
      >
        {timeRangeOptions.map((option) => (
          <Button
            key={option.value}
            onClick={() => onTimeRangeChange(option.value)}
            size="small"
            variant={timeRange === option.value ? 'contained' : 'text'}
            sx={{
              px: 1.5,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 500,
              borderRadius: 1,
              backgroundColor:
                timeRange === option.value ? 'white' : 'transparent',
              color:
                timeRange === option.value ? 'text.primary' : 'text.secondary',
              boxShadow: timeRange === option.value ? 1 : 'none',
              '&:hover': {
                backgroundColor:
                  timeRange === option.value ? 'white' : 'transparent',
                color: 'text.primary',
              },
            }}
          >
            {option.label}
          </Button>
        ))}
      </Paper>
    </Box>
  );

  return (
    <Card title={chartHeader} noPadding>
      <Box sx={{ p: 2, position: 'relative', minHeight: '400px' }}>
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Box sx={{ opacity: isLoading ? 0.5 : 1 }}>
          <CoinPriceChart coin={selectedCoin} timeRange={timeRange} />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          <Grid sx={{ gridColumn: { xs: 'span 3' } }}>
            <Typography variant="body2" fontWeight="medium">
              Open:
            </Typography>
            <Typography variant="body2">
              ${(price * 0.98).toFixed(2)}
            </Typography>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 3' } }}>
            <Typography variant="body2" fontWeight="medium">
              Close:
            </Typography>
            <Typography variant="body2">${price.toLocaleString()}</Typography>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 3' } }}>
            <Typography variant="body2" fontWeight="medium">
              High:
            </Typography>
            <Typography variant="body2">
              ${(price * 1.03).toFixed(2)}
            </Typography>
          </Grid>
          <Grid sx={{ gridColumn: { xs: 'span 3' } }}>
            <Typography variant="body2" fontWeight="medium">
              Low:
            </Typography>
            <Typography variant="body2">
              ${(price * 0.96).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
