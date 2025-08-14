'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  duration?: number; // Duration in milliseconds
}

export default function LoadingScreen({ duration = 3000 }: LoadingScreenProps) {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Always show animation on page load/refresh
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 800);

    const hideTimer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    </div>
  );
}
