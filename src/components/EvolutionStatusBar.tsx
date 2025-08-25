import React, { useState, useEffect } from 'react';

interface EvolutionItem {
  name: string;
  completed: boolean;
  multiplier: number;
  current: number;
  target: number;
  status: string;
}

const EvolutionStatusBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60); // 3 days in seconds
  
  const evolutionItems: EvolutionItem[] = [
    { name: 'Suggestions', completed: true, multiplier: 2, current: 500, target: 500, status: 'Complete' },
    { name: 'Marketcap', completed: false, multiplier: 2, current: 200, target: 500, status: 'In Progress' },
    { name: 'Holders', completed: true, multiplier: 2, current: 1000, target: 1000, status: 'Complete' },
    { name: 'Profitability', completed: false, multiplier: 2, current: 150, target: 300, status: 'In Progress' },
  ];

  const completedCount = evolutionItems.filter(item => item.completed).length;
  const totalCount = evolutionItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  // Calculate speed boost based on completed items
  const speedBoost = evolutionItems.reduce((total, item) => {
    return total + (item.completed ? item.multiplier : 1);
  }, 0) / totalCount;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        // Apply speed boost from completed checklist items
        return Math.max(0, prev - speedBoost);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [speedBoost]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Progress Bar with Minimal Countdown */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 max-w-40">
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-black h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xs text-gray-600">
            <span className="font-medium">{completedCount}/{totalCount}</span>
            <span className="ml-1">Jarvis Evolution Progress</span>
          </div>
          <div className="text-xs text-black font-mono bg-gray-100 px-2 py-1 rounded">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Checklist Items - Improved layout */}
      <div className="flex flex-wrap justify-center gap-4">
        {evolutionItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-2 group relative cursor-help"
            title={`${item.current}/${item.target} ${item.name} - ${item.status}`}
          >
            <div className={`w-3 h-3 rounded-full ${item.completed ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200`}></div>
            <span className="text-sm text-gray-700 font-medium">{item.name}</span>
            {item.completed && (
              <span className="text-sm text-green-600 font-bold">{item.multiplier}x</span>
            )}
            
            {/* Enhanced Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg">
              {item.current}/{item.target} {item.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionStatusBar;
