import React, { useState, useEffect } from 'react';
import LazyGlobe3D from './LazyGlobeAnimation';

interface GlobeWrapperProps {
  className?: string;
  pointCount?: number;
  globeRadius?: number;
}

const GlobeWrapper: React.FC<GlobeWrapperProps> = (props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Loading placeholder */}
      {!isReady && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* Globe with fade-in - absolute positioned to maintain original centering */}
      <div
        className={`transition-opacity duration-700 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LazyGlobe3D {...props} />
      </div>
    </div>
  );
};

export default GlobeWrapper;
