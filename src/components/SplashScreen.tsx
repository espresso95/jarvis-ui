'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timestamp = new Date().getTime().toString();
    localStorage.setItem('page_load_timestamp', timestamp);
    setIsVisible(true);
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2200);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transition: 'opacity 800ms ease-out' }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    </div>
  );
}
