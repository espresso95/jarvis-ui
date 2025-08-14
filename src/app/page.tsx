import { Grid, Stack } from '@mui/material';
import { DashboardHeader } from 'src/components/common/DashboardHeader';
import { DashboardStatsSection } from 'src/components/common/DashboardStatsSection';
import { MarketOverviewCard } from 'src/components/common/MarketOverviewCard';
import { PerformanceOverviewCard } from 'src/components/common/PerformanceOverviewCard';

/**
 * Home page component
 *
 * The main dashboard page of the application that displays
 * portfolio statistics, market overview, and performance metrics.
 */
export default function Home() {
  // Current date formatted for the dashboard header
  const currentDate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Stack spacing={3}>
      {/* Dashboard Header */}
      <DashboardHeader
        title="Trading Dashboard"
        marketStatus="Open"
        lastUpdate={currentDate}
      />

      {/* Quick Stats Section */}
      <DashboardStatsSection />

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Performance Overview Card - Left Column */}
        <Grid
          component="div"
          sx={{ gridColumn: { xs: 'span 12', lg: 'span 6' } }}
        >
          <PerformanceOverviewCard />
        </Grid>

        {/* Market Overview Card - Right Column */}
        <Grid
          component="div"
          sx={{ gridColumn: { xs: 'span 12', lg: 'span 6' } }}
        >
          <MarketOverviewCard />
        </Grid>
      </Grid>
    </Stack>
  );
}
