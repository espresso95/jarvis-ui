import React, { useState, useEffect, lazy, Suspense } from 'react';
import loadingAnimation from '../assets/lottie/loading.json';

// Lazy load Lottie
const LottieComponent = lazy(() => 
  import('lottie-react').then(module => ({ 
    default: module.default as React.ComponentType<any>
  }))
);

interface LoadingBoxProps {
  onClose?: () => void;
}

const LoadingBox: React.FC<LoadingBoxProps> = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    'Contacting the server...',
    'Getting a response...',
    'Calculating direction...',
  ];

  // Cycle through loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500); // Change message every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-black p-4 mb-2">
      <div className="flex items-center">
        <div className="w-6 h-6 mr-3">
          <Suspense fallback={<div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full" />}>
            <LottieComponent
              animationData={loadingAnimation}
              loop={true}
              autoplay={true}
            />
          </Suspense>
        </div>
        <div className="text-agent-title">
          <p>{loadingMessages[messageIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingBox;
