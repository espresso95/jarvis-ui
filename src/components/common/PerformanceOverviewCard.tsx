import { Avatar } from '@mui/material';
import {
  TrendingUp,
  PieChart,
  Assessment,
  Autorenew,
} from '@mui/icons-material';
import { DataCard } from './DataCard';
import { ListCard } from './ListCard';

/**
 * PerformanceOverviewCard component
 *
 * A component that displays performance metrics using our component architecture
 */
export function PerformanceOverviewCard() {
  // Sample performance data - in a real app this would come from props or a data hook
  const performanceData = [
    {
      id: 'portfolio-growth',
      avatar: (
        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
          <PieChart />
        </Avatar>
      ),
      primary: 'Portfolio Growth',
      secondary: 'Last 30 days',
      value: '+9.2%',
      valueColor: 'success.main',
      valueSubtext: '+$10,546',
      valueSubtextColor: 'text.secondary',
    },
    {
      id: 'trading-volume',
      avatar: (
        <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main' }}>
          <Assessment />
        </Avatar>
      ),
      primary: 'Trading Volume',
      secondary: 'Weekly average',
      value: '$24,521',
      valueSubtext: '+23% WoW',
      valueSubtextColor: 'success.main',
      trend: <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />,
    },
    {
      id: 'system-status',
      avatar: (
        <Avatar sx={{ bgcolor: 'info.light', color: 'info.main' }}>
          <Autorenew />
        </Avatar>
      ),
      primary: 'System Status',
      secondary: 'All systems normal',
      value: 'Operational',
      valueColor: 'success.main',
      valueSubtext: '99.9% uptime',
      valueSubtextColor: 'text.secondary',
    },
  ];

  return (
    <DataCard title="Performance Overview">
      <ListCard data={performanceData} />
    </DataCard>
  );
}
