import { Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { DataCard } from './DataCard';
import { ListCard } from './ListCard';

/**
 * MarketOverviewCard component
 *
 * A component that displays market overview information using our component architecture
 */
export function MarketOverviewCard() {
  // Sample market data - in a real app this would come from props or a data hook
  const marketData = [
    {
      id: 'btc',
      avatar: <Avatar>BTC</Avatar>,
      primary: 'Bitcoin',
      secondary: 'BTC/USD',
      value: '$61,234.52',
      valueSubtext: '+2.4%',
      valueSubtextColor: 'success.main',
      trend: <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />,
    },
    {
      id: 'eth',
      avatar: <Avatar>ETH</Avatar>,
      primary: 'Ethereum',
      secondary: 'ETH/USD',
      value: '$3,816.44',
      valueSubtext: '+1.8%',
      valueSubtextColor: 'success.main',
      trend: <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />,
    },
    {
      id: 'sol',
      avatar: <Avatar>SOL</Avatar>,
      primary: 'Solana',
      secondary: 'SOL/USD',
      value: '$124.35',
      valueSubtext: '+4.2%',
      valueSubtextColor: 'success.main',
      trend: <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />,
    },
    {
      id: 'avax',
      avatar: <Avatar>AVAX</Avatar>,
      primary: 'Avalanche',
      secondary: 'AVAX/USD',
      value: '$35.76',
      valueSubtext: '-0.8%',
      valueSubtextColor: 'error.main',
      trend: <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />,
    },
  ];

  return (
    <DataCard title="Market Overview">
      <ListCard data={marketData} />
    </DataCard>
  );
}
