'use client';

import { useState, useEffect } from 'react';

export default function GlobalLoadingScreen() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if this is a fresh page load using the document's readyState
    if (document.readyState === 'complete') {
      // Delay a bit to ensure animation is visible
      setTimeout(() => {
        const fadeOutTimer = setTimeout(() => {
          setFadeOut(true);
        }, 2200); // Start fade out after 2.2 seconds

        const hideTimer = setTimeout(() => {
          setIsFirstLoad(false);
        }, 3000); // Complete hiding after 3 seconds

        return () => {
          clearTimeout(fadeOutTimer);
          clearTimeout(hideTimer);
        };
      }, 100);
    }
  }, []);

  // If it's not the first load or if we're still loading document, don't show
  if (!isFirstLoad) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ transition: 'opacity 800ms ease-in-out' }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    </div>
  );
}
