'use client';

import { useState, useEffect } from 'react';

export default function InitialLoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.2 seconds
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // Complete hiding after 3 seconds
    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // If not loading, don't render anything
  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ transition: 'opacity 800ms ease-in-out' }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    </div>
  );
}
