import React, { lazy, Suspense } from 'react';

// Lazy load the Globe3D component
const Globe3D = lazy(() => import('./GlobeAnimation'));

interface HeartbeatConfig {
  minScale: number;
  maxScale: number;
  beatSpeed: number;
  pauseDuration: number;
}

interface LazyGlobe3DProps {
  className?: string;
  pointCount?: number;
  globeRadius?: number;
  heartbeat?: HeartbeatConfig;
  modelPath?: string;
}

const LazyGlobe3D: React.FC<LazyGlobe3DProps> = (props) => {
  return (
    <Suspense 
      fallback={
        <div className={`${props.className || 'w-full h-[90%] md:w-[1000px] md:h-[1000px]'} bg-white flex items-center justify-center`}>
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading 3D Globe...</p>
          </div>
        </div>
      }
    >
      <Globe3D {...props} />
    </Suspense>
  );
};

export default LazyGlobe3D;
