import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

interface PnlLineChartProps {
  data: number[];
  dates: string[];
}

export default function PnlLineChart({ data, dates }: PnlLineChartProps) {
  const buffer = 100;
  const minY = Math.min(...data) - buffer;
  const maxY = Math.max(...data) + buffer;

  const [chartHeight, setChartHeight] = React.useState(300);

  React.useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        // Small screens
        setChartHeight(200);
      } else {
        // Medium and above
        setChartHeight(300);
      }
    };

    // Set initial height
    updateHeight();

    // Add event listener for window resize
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <LineChart
      xAxis={[
        {
          data: dates,
          scaleType: 'point',
          tickLabelStyle: { display: 'none' },
        },
      ]}
      yAxis={[
        {
          min: minY,
          max: maxY,
          valueFormatter: (value: number | null) =>
            value !== null ? `$${value}` : '$0',
        },
      ]}
      series={[
        {
          data,
          showMark: true,
          color: 'black',
          curve: 'monotoneX',
          valueFormatter: (value: number | null) =>
            value !== null ? `$${value}` : '$0',
        },
      ]}
      margin={{ left: 0, right: 20, top: 20, bottom: 20 }}
      sx={{
        '.MuiChartsLineElement-root': { stroke: 'black', strokeWidth: 1 },
        '.MuiChartsMarkElement-root': {
          stroke: 'black',
          fill: 'white',
          strokeWidth: 1,
        },
      }}
      height={chartHeight}
    />
  );
}
