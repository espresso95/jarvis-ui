import React from 'react';
import { useNavigate } from 'react-router-dom';
import Block from '../assets/icons/block.svg?react';

interface Agent {
  id: number;
  name: string;
  status: string;
  apr: string;
  tradeSuccess: string;
  tvl: string;
  age: string;
}

interface AgentCardProps {
  agents: Agent[];
}

const AgentCard: React.FC<AgentCardProps> = ({ agents }) => {
  const navigate = useNavigate();

  const handleAgentClick = (agentId: number) => {
    navigate(`/agents/${agentId}`);
  };

  // Sort agents: ACTIVE first, then CULLED, then by TVL (highest first)
  const sortedAgents = [...agents].sort((a, b) => {
    // First sort by status priority
    const statusPriority = { ACTIVE: 1, WAITING: 2, CULLED: 3 };
    const statusDiff =
      statusPriority[a.status as keyof typeof statusPriority] -
      statusPriority[b.status as keyof typeof statusPriority];

    if (statusDiff !== 0) {
      return statusDiff;
    }

    // If same status, sort by TVL (highest first)
    const aTvl = parseFloat(a.tvl.replace(/[$,]/g, ''));
    const bTvl = parseFloat(b.tvl.replace(/[$,]/g, ''));
    return bTvl - aTvl;
  });

  return (
    <div>
      {sortedAgents.map((agent) => (
        <div
          key={agent.id}
          className="border-border border-t pt-4 pb-4 space-y-1 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={() => handleAgentClick(agent.id)}
        >
          <div className="flex flex-row items-center mb-1">
            <Block className="h-4 w-4" />
            <p className="text-agent-title ml-1">{agent.name}</p>
            <div
              className={`${
                agent.status.toLowerCase() === 'culled'
                  ? 'bg-culled'
                  : agent.status.toLowerCase() === 'active'
                    ? 'bg-active'
                    : 'bg-waiting'
              } px-1 ml-2`}
            >
              <p className="text-stat-label">{agent.status}</p>
            </div>
          </div>
          <div className="flex flex-row space-x-2 text-stat-label mb-1">
            <p>APR:</p>
            <p>{agent.apr}</p>
          </div>
          <div className="flex flex-row space-x-2 text-stat-label">
            <p>TRADE SUCCESS:</p>
            <p>{agent.tradeSuccess}</p>
          </div>
          <div className="flex flex-row space-x-2 text-stat-label">
            <p>TVL:</p>
            <p>{agent.tvl}</p>
          </div>
          <div className="flex flex-row space-x-2 text-stat-label">
            <p>AGE:</p>
            <p>{agent.age}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentCard;
