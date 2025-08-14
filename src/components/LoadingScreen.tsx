import React, { useState, useEffect, lazy, Suspense } from 'react';
import loadingAnimation from '../assets/lottie/loading.json';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';

// Lazy load Lottie with proper typing
const LottieComponent = lazy(() => 
  import('lottie-react').then(module => ({ 
    default: module.default as React.ComponentType<any>
  }))
);

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
  preloadModels?: string[]; // Array of model paths to preload
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 5000,
  preloadModels = [],
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const preloadAllModels = async () => {
      if (preloadModels.length === 0) {
        setModelsLoaded(true);
        return;
      }

      const loader = new FBXLoader();
      const loadPromises = preloadModels.map((modelPath) => {
        return new Promise((resolve) => {
          loader.load(
            modelPath,
            (fbx: THREE.Group) => {
              console.log(`Preloaded model: ${modelPath}`);
              resolve(fbx);
            },
            (progress: ProgressEvent) => {
              console.log(
                `Loading ${modelPath}: ${
                  (progress.loaded / progress.total) * 100
                }%`,
              );
            },
            (error: unknown) => {
              console.warn(`Failed to preload ${modelPath}:`, error);
              resolve(null); // Don't fail the whole loading process
            },
          );
        });
      });

      try {
        await Promise.all(loadPromises);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error preloading models:', error);
        setModelsLoaded(true); // Continue anyway
      }
    };

    preloadAllModels();
  }, [preloadModels]);

  useEffect(() => {
    // Only start the timer after models are loaded
    if (!modelsLoaded) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete, modelsLoaded]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="w-32 h-32">
        <Suspense fallback={<div className="w-32 h-32 bg-gray-200 animate-pulse rounded-full" />}>
          <LottieComponent animationData={loadingAnimation} loop={true} autoplay={true} />
        </Suspense>
      </div>
    </div>
  );
};

export default LoadingScreen;
