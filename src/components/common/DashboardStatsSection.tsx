import { Grid } from '@mui/material';
import { StatCard } from './StatCard';

/**
 * DashboardStatsSection component
 *
 * A component that renders the stats section on the dashboard
 * Using our StatCard component architecture
 */
export function DashboardStatsSection() {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid
        component="div"
        sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', lg: 'span 3' } }}
      >
        <StatCard
          title="Total Balance"
          value="$125,800"
          trend="up"
          trendValue="3.5% (24h)"
        />
      </Grid>

      <Grid
        component="div"
        sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', lg: 'span 3' } }}
      >
        <StatCard
          title="Active Bots"
          value="5"
          subtitle="2 in profit, 3 monitoring"
        />
      </Grid>

      <Grid
        component="div"
        sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', lg: 'span 3' } }}
      >
        <StatCard
          title="PnL (This Month)"
          value="+$3,241"
          trend="up"
          trendValue="12.4% MoM"
        />
      </Grid>

      <Grid
        component="div"
        sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', lg: 'span 3' } }}
      >
        <StatCard title="Win Rate" value="68%" subtitle="Last 50 trades" />
      </Grid>
    </Grid>
  );
}
