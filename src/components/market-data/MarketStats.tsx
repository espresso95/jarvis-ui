import { Card } from '@/components/ui/Card';
import { Box, Typography } from '@mui/material';

type MarketStatsProps = {
  marketCap: string;
  volume24h: string;
  supply: string;
  change24h: number;
};

export function MarketStats({
  marketCap,
  volume24h,
  supply,
  change24h,
}: MarketStatsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
      }}
    >
      <Card noPadding sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Market Cap
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          ${marketCap}
        </Typography>
      </Card>

      <Card noPadding sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          24h Volume
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          ${volume24h}
        </Typography>
      </Card>

      <Card noPadding sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Circulating Supply
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {supply}
        </Typography>
      </Card>

      <Card noPadding sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Price Change (24h)
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={change24h >= 0 ? 'success.main' : 'error.main'}
        >
          {change24h >= 0 ? '+' : ''}
          {change24h}%
        </Typography>
      </Card>
    </Box>
  );
}
