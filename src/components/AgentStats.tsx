import React from 'react';

interface Stat {
  name: string;
  value: string;
}

interface AgentStatsProps {
  stats: Stat[];
}

const AgentStats: React.FC<AgentStatsProps> = ({ stats }) => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border border-black py-3 px-2 mb-2 lg:mb-0"
          >
            <p className="text-agent-stat-title mb-1">{stat.name}</p>
            <p className="text-agent-stat-value">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentStats;
