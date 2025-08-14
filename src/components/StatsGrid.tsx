import React from 'react';

interface Stat {
  name: string;
  value: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-16">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-col bg-stat px-3 py-2 rounded-sm"
        >
          <div className="text-stat-label">{stat.name}</div>
          <div className="text-stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
