// filepath: /Users/nimoraki/Coding/coin-trader/apps/notos-trader-ui/src/components/PriceChart.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import {
  createChart,
  ColorType,
  IChartApi,
  LineData,
  UTCTimestamp,
  LineSeries,
} from 'lightweight-charts';
import { useComponentStyles } from '@/hooks/useComponentStyles';

// Generic chart data interface
export interface ChartDataPoint {
  timestamp: number | string | Date;
  value: number;
}

// Base chart props used by all chart implementations
export interface BaseChartProps {
  height?: number;
  width?: string | number;
  showToolbar?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

// Generic chart props with data for specialized chart implementations that inject their own data
export interface GenericChartProps extends BaseChartProps {
  data: ChartDataPoint[];
  valueKey?: string;
  colorSettings?: {
    lineColor?: string;
    areaColor?: string;
  };
}

/**
 * GenericPriceChart component
 *
 * A reusable chart component for displaying time-series data
 * that follows our component architecture pattern.
 *
 * @example
 * ```tsx
 * <GenericPriceChart
 *   data={priceData}
 *   height={300}
 *   colorSettings={{
 *     lineColor: '#10B981',
 *     areaColor: '#10B981'
 *   }}
 * />
 * ```
 */
export function GenericPriceChart({
  data,
  height = 320,
  width = '100%',
  isLoading = false,
  error = null,
  valueKey = 'value',
  colorSettings,
}: GenericChartProps) {
  const styles = useComponentStyles();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<IChartApi | null>(null);
  const [series, setSeries] = useState<any>(null); // Changed from ISeriesApi<'Area'> to any for v5 compatibility
  const isDarkMode =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Format data for chart
  const formatDataForChart = (data: ChartDataPoint[]): LineData[] => {
    return data
      .filter(
        (item) =>
          item.timestamp &&
          typeof item[valueKey as keyof ChartDataPoint] === 'number',
      )
      .map((item) => {
        // Convert timestamp to UTC timestamp for chart
        const timestamp = Math.floor(
          new Date(item.timestamp).getTime() / 1000,
        ) as UTCTimestamp;
        return {
          time: timestamp,
          value: item.value,
        };
      });
  };

  // Create chart instance on component mount
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: {
            type: ColorType.Solid,
            color: isDarkMode ? '#1f2937' : '#ffffff',
          },
          textColor: isDarkMode ? '#d1d5db' : '#374151',
        },
        grid: {
          vertLines: { color: isDarkMode ? '#374151' : '#f3f4f6' },
          horzLines: { color: isDarkMode ? '#374151' : '#f3f4f6' },
        },
        width: chartContainerRef.current.clientWidth,
        height: height,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
        crosshair: {
          mode: 0, // Normal crosshair mode
        },
        rightPriceScale: {
          borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
        },
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
        },
        handleScale: {
          axisPressedMouseMove: true,
          mouseWheel: true,
          pinch: true,
        },
      });

      // Create the price series using V5 API
      const areaSeries = chart.addSeries(LineSeries, {
        color: colorSettings?.lineColor || '#2962FF',
      });

      setChartInstance(chart);
      setSeries(areaSeries);

      // Handle window resize
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [isDarkMode, height, colorSettings]);

  // Update chart data when data changes
  useEffect(() => {
    if (chartInstance && series && data.length > 0) {
      // Format the data for the chart
      const formattedData = formatDataForChart(data);

      // Update the chart with the new data
      series.setData(formattedData);

      // Fit the chart content to view
      chartInstance.timeScale().fitContent();
    }
  }, [data, series, chartInstance]);

  return (
    <Box
      sx={{
        ...styles.container,
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        position: 'relative',
        minHeight: height,
      }}
    >
      {isLoading && (
        <Box
          sx={{
            ...styles.flexCenter,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.7)',
          }}
        >
          <CircularProgress size={32} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            Loading chart data...
          </Typography>
        </Box>
      )}

      {error && (
        <Box
          sx={{
            ...styles.flexCenter,
            height: height,
            color: 'error.main',
          }}
        >
          <Typography color="error">
            Error loading chart data: {error}
          </Typography>
        </Box>
      )}

      {!isLoading && !error && (
        <div ref={chartContainerRef} style={{ width, height }} />
      )}

      {!isLoading && !error && data.length === 0 && (
        <Box
          sx={{
            ...styles.flexCenter,
            height: height,
            color: 'text.secondary',
          }}
        >
          <Typography color="text.secondary">
            No data available to display
          </Typography>
        </Box>
      )}
    </Box>
  );
}
