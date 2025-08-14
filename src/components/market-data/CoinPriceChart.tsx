'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  GenericPriceChart,
  ChartDataPoint,
  BaseChartProps,
} from '../PriceChart';
import {
  MarketDataDto,
  MarketDataFeedControllerGetSnapshotPeriodEnum,
} from 'src/api';
import { useMarketDataApi } from '@/hooks/useMarketDataApi';
import { CoinId } from '@/types/market';
import { Button } from '@mui/material';
import {
  RefreshRounded as RefreshIcon,
  ErrorOutline as AlertCircleIcon,
} from '@mui/icons-material';

// Move color settings outside the component to prevent recreation
const COIN_COLOR_MAP = {
  solana: { lineColor: '#9945FF', areaColor: '#9945FF' },
  jupiter: { lineColor: '#4e81ee', areaColor: '#4e81ee' },
  trump: { lineColor: '#E0394E', areaColor: '#E0394E' },
  render: { lineColor: '#24ae8f', areaColor: '#24ae8f' },
  bonk: { lineColor: '#E7A558', areaColor: '#E7A558' },
};

const DEFAULT_COLOR = { lineColor: '#4e81ee', areaColor: '#4e81ee' };

interface CoinChartProps extends BaseChartProps {
  coin: CoinId;
  timeRange?: MarketDataFeedControllerGetSnapshotPeriodEnum;
}

export default function CoinPriceChart({
  coin,
  timeRange = MarketDataFeedControllerGetSnapshotPeriodEnum._1d,
  height,
  width,
  showToolbar,
}: CoinChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { fetchMarketData, isLoading, error } = useMarketDataApi();

  // Use useMemo for color settings
  const colorSettings = useMemo(
    () => COIN_COLOR_MAP[coin] || DEFAULT_COLOR,
    [coin],
  );

  // Memoize convertMarketDataToChartData to ensure stability
  const convertMarketDataToChartData = useCallback(
    (data: MarketDataDto[]): ChartDataPoint[] => {
      return data
        .filter((item) => item.timestamp && item.bars?.['1s']?.close != null)
        .map((item) => ({
          timestamp: item.timestamp,
          value: item.bars['1s'].close,
        }));
    },
    [],
  );

  // Handle page refresh
  const handlePageRefresh = () => {
    window.location.reload();
  };

  // Fetch data when coin or timeRange changes
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    // Reset error state on fetch
    setHasError(false);
    setErrorMessage(null);

    const loadData = async () => {
      try {
        // Fetch data for the specific coin and timeRange
        const data = await fetchMarketData(coin, timeRange);
        if (isMounted) {
          // Only update state if the data has actually changed
          setChartData((prevData) => {
            const newData = convertMarketDataToChartData(data);
            const isDataEqual =
              JSON.stringify(prevData) === JSON.stringify(newData);
            return isDataEqual ? prevData : newData;
          });
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return; // Ignore abort errors

        console.error('Error fetching market data:', err);
        if (isMounted) {
          setHasError(true);
          const formattedError = err.formattedError;
          setErrorMessage(
            formattedError?.message || 'Failed to load market data',
          );
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort(); // Abort any in-flight requests
    };
  }, [coin, timeRange, fetchMarketData, convertMarketDataToChartData]); // Re-run when coin or timeRange changes

  // Memoize the rendered chart to prevent unnecessary re-renders
  const renderedChart = useMemo(() => {
    if ((hasError || error) && !isLoading) {
      return (
        <div
          style={{
            borderRadius: '0.5rem',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            height: height || '400px',
            width: width || '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <AlertCircleIcon
              style={{ fontSize: 48, color: '#d32f2f', marginBottom: '1rem' }}
            />
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              Failed to load chart data
            </h3>
            <p
              style={{
                color: 'rgba(0, 0, 0, 0.6)',
                marginBottom: '1rem',
                maxWidth: '400px',
              }}
            >
              {errorMessage ||
                error ||
                'Connection error. Please refresh the page to try again.'}
            </p>
            <Button
              onClick={handlePageRefresh}
              variant="contained"
              startIcon={<RefreshIcon />}
              sx={{ mt: 2 }}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return (
      <GenericPriceChart
        data={chartData}
        height={height}
        width={width}
        showToolbar={showToolbar}
        isLoading={isLoading}
        error={null} // Don't pass error to GenericPriceChart as we're handling it above
        colorSettings={colorSettings}
      />
    );
  }, [
    chartData,
    colorSettings,
    error,
    errorMessage,
    hasError,
    height,
    isLoading,
    showToolbar,
    width,
  ]);

  return renderedChart;
}
