import React from 'react';
import AgentCard from '../AgentCard';
import StatsGrid from '../StatsGrid';
import TokenPrice from '../TokenPrice';
import PageLayout from '../PageLayout';
import EvolutionProgress from '../EvolutionProgress';

import {
  Bots,
  Stats,
  TokenData,
  EvolutionData,

} from '../../data/mockData';

const SectionTwo: React.FC = () => {
  return (
    <div className="snap-section md:snap-none">
      <div className="inner-scroll">
        <PageLayout>
          <TokenPrice tokenData={TokenData} />

          <EvolutionProgress
            currentStage={EvolutionData.currentStage}
            nextStage={EvolutionData.nextStage}
            progress={EvolutionData.progress}
            statusColor={EvolutionData.statusColor}
          />

          <StatsGrid stats={Stats} />

          {/* <CullCountdown targetTimestamp={cullTimestamp} /> */}

          <div className=" mt-12 flex flex-row justify-between items-center">
            <p className="text-agent-header">Agents</p>
          </div>

          <AgentCard agents={Bots} />
        </PageLayout>
      </div>
    </div>
  );
};

export default SectionTwo;
