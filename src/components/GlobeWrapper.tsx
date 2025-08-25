import React, { useState, useEffect } from 'react';
import LazyGlobe3D from './LazyGlobeAnimation';

interface GlobeWrapperProps {
  className?: string;
  pointCount?: number;
  globeRadius?: number;
}

interface ChatBubble {
  id: string;
  message: string;
  position: { x: number; y: number };
  opacity: number;
  scale: number;
}

const GlobeWrapper: React.FC<GlobeWrapperProps> = (props) => {
  const [isReady, setIsReady] = useState(false);
  const [chatBubbles, setChatBubbles] = useState<ChatBubble[]>([]);

  // Trading-focused user suggestions for the popup bubbles
  const userSuggestions = [
    "Buy BONK at $0.00001234 📈",
    "JARVIS should short BTC here 📉",
    "ETH support at $3200, go long 🚀",
    "Take profit on SOL at $150 💰",
    "Stop loss at $0.000008 for BONK 🛑",
    "JARVIS, buy the dip on MATIC 📊",
    "Market sentiment is bullish 🐂",
    "Wait for confirmation signal ⏳",
    "Risk management: 2% per trade 📋",
    "JARVIS, analyze volume spike 📈",
    "Support level: $0.00001000 🎯",
    "Resistance at $0.00001500 🚧",
    "Trend following strategy 📊",
    "JARVIS, execute limit order 💼",
    "Market structure looks strong 💪"
  ];

  useEffect(() => {
    // Small delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Handle window resize to update bubble positions
    const handleResize = () => {
      // Force re-render of existing bubbles with new viewport dimensions
      setChatBubbles(prev => [...prev]);
    };

    window.addEventListener('resize', handleResize);

    // Create random chat bubbles
    const createBubble = () => {
      const randomMessage = userSuggestions[Math.floor(Math.random() * userSuggestions.length)];
      
      // Position bubbles randomly across the viewport, but closer to the middle
      // Avoid the very edges (first and last 20% of screen)
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate safe zones (avoiding edges)
      const safeZoneX = viewportWidth * 0.2; // 20% from each edge
      const safeZoneY = viewportHeight * 0.2; // 20% from each edge
      
      // Random position within the safe middle area
      const randomX = (Math.random() - 0.5) * (viewportWidth - 2 * safeZoneX);
      const randomY = (Math.random() - 0.5) * (viewportHeight - 2 * safeZoneY);
      
      const newBubble: ChatBubble = {
        id: Date.now().toString(),
        message: randomMessage,
        position: { x: randomX, y: randomY },
        opacity: 0,
        scale: 0.8
      };

      setChatBubbles(prev => [...prev, newBubble]);

      // Animate bubble in
      setTimeout(() => {
        setChatBubbles(prev => 
          prev.map(bubble => 
            bubble.id === newBubble.id 
              ? { ...bubble, opacity: 1, scale: 1 }
              : bubble
          )
        );
      }, 100);

      // Remove bubble after 8 seconds (longer display)
      setTimeout(() => {
        setChatBubbles(prev => 
          prev.map(bubble => 
            bubble.id === newBubble.id 
              ? { ...bubble, opacity: 0, scale: 0.8 }
              : bubble
          )
        );
        
        setTimeout(() => {
          setChatBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
        }, 500);
      }, 8000);

      // Schedule next bubble with shorter intervals for testing
      setTimeout(() => {
        createBubble();
      }, Math.random() * 8000 + 5000); // 5-13 seconds between bubbles
    };

    // Start the first bubble after a shorter delay for testing
    const initialDelay = setTimeout(() => {
      createBubble();
    }, 3000); // 3 seconds delay before first bubble

    return () => {
      clearTimeout(initialDelay);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReady]);

  return (
    <div className="relative">
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

      {/* User Suggestion Chat Bubbles */}
      {chatBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: `calc(50% + ${bubble.position.x}px)`,
            top: `calc(50% + ${bubble.position.y}px)`,
            transform: `translate(-50%, -50%) scale(${bubble.scale})`,
            opacity: bubble.opacity,
            transition: 'all 0.5s ease-out'
          }}
        >
          {/* Chat Box Style Bubble */}
          <div className="relative">
            {/* Chat Box Tail pointing to globe */}
            <div className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-l-4 ${
              bubble.position.x < 0 
                ? 'border-l-black border-r-transparent border-t-transparent border-b-transparent -right-2' 
                : 'border-r-black border-l-transparent border-t-transparent border-b-transparent -left-2'
            }`}></div>
            
            {/* Chat Box Content */}
            <div className="bg-white border border-gray-300 text-black px-4 py-3 rounded-lg shadow-lg max-w-56">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-xs font-medium text-gray-600">User Suggestion</div>
              </div>
              <div className="text-sm font-medium leading-relaxed text-gray-800">{bubble.message}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlobeWrapper;
