import { StatRow } from '@/components/ui/StatRow';
import { Card } from '@/components/ui/Card';
import { CoinId } from '@/types/market';
import { Stack, Typography } from '@mui/material';

type PriceStatisticsProps = {
  coinName: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
  allTimeHigh: number;
  allTimeHighDate: string;
  selectedCoin: CoinId;
};

export function PriceStatistics({
  coinName,
  price,
  change24h,
  volume24h,
  marketCap,
  allTimeHigh,
  allTimeHighDate,
  selectedCoin,
}: PriceStatisticsProps) {
  return (
    <Card title={`${coinName} Price Statistics`}>
      <Stack spacing={2}>
        <StatRow
          label={`${coinName} Price`}
          value={`$${price.toLocaleString()}`}
        />
        <StatRow
          label="24h Change"
          value={
            <Typography
              variant="body2"
              fontWeight="medium"
              color={change24h >= 0 ? 'success.main' : 'error.main'}
            >
              {change24h >= 0 ? '+' : ''}
              {change24h}%
            </Typography>
          }
        />
        <StatRow
          label="24h Low / 24h High"
          value={`$${(price * 0.96).toFixed(2)} / $${(price * 1.03).toFixed(2)}`}
        />
        <StatRow label="Trading Volume" value={`$${volume24h}`} />
        <StatRow
          label="Market Cap Rank"
          value={`#${selectedCoin === 'solana' ? '5' : selectedCoin === 'jupiter' ? '42' : selectedCoin === 'trump' ? '158' : selectedCoin === 'render' ? '65' : '85'}`}
        />
        <StatRow label="Market Cap" value={`$${marketCap}`} />
        <StatRow
          label="All-Time High"
          value={`$${allTimeHigh.toLocaleString()} (${allTimeHighDate})`}
          isLast
        />
      </Stack>
    </Card>
  );
}
