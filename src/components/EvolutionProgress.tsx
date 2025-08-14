import React from 'react';

interface EvolutionProgressProps {
  currentStage: string;
  nextStage: string;
  progress: number; // 0-100
  statusColor?: string;
}

const EvolutionProgress: React.FC<EvolutionProgressProps> = ({
  currentStage,
  nextStage,
  progress,
  statusColor = 'bg-statuspending',
}) => {
  return (
    <div className="mb-12 md:mb-14 md:mt-20">
      <div className="flex flex-row justify-between mb-2 mt-12">
        <p className="text-agent-header">Evolution</p>
        {/* <p>23:58:14</p> */}
        {/* <div className="flex flex-row items-center text-agent-header space-x-2">
          <div className={`${statusColor} w-3 h-3 rounded-full`}></div>
          <p className="text-stat-label">{currentStage}</p>
        </div> */}
      </div>
      <div className="w-full h-3 border border-black flex flex-start">
        <div className="bg-black" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <p className="text-stat-label">{currentStage.toUpperCase()}</p>
        <p className="text-stat-label">{nextStage.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default EvolutionProgress;
