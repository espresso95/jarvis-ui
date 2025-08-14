import React, { lazy, Suspense } from 'react';

// Lazy load the PnlLineChart component
const PnlLineChart = lazy(() => import('./PnlLineChart'));

interface LazyPnlLineChartProps {
  data: number[];
  dates: string[];
}

const LazyPnlLineChart: React.FC<LazyPnlLineChartProps> = (props) => {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Loading Chart...</p>
          </div>
        </div>
      }
    >
      <PnlLineChart {...props} />
    </Suspense>
  );
};

export default LazyPnlLineChart;
