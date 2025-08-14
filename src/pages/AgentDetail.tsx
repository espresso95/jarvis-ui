import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LazyPnlLineChart from '../components/LazyPnlLineChart';
import AgentStats from '../components/AgentStats';
import PageLayout from '../components/PageLayout';

interface Agent {
  id: number;
  name: string;
  status: string;
  apr: string;
  tradeSuccess: string;
  tvl: string;
  age: string;
}

const AgentsData: Agent[] = [
  {
    id: 1,
    name: 'Agent Orange',
    status: 'CULLED',
    apr: '32%',
    tradeSuccess: '18%',
    tvl: '$177,399.00',
    age: '3 hours 14 minutes',
  },
  {
    id: 2,
    name: 'Agent Blue',
    status: 'ACTIVE',
    apr: '25%',
    tradeSuccess: '22%',
    tvl: '$200,000.00',
    age: '1 day 2 hours',
  },
  {
    id: 3,
    name: 'Agent Green',
    status: 'ACTIVE',
    apr: '25%',
    tradeSuccess: '22%',
    tvl: '$300,000.00',
    age: '1 day 2 hours',
  },
  {
    id: 4,
    name: 'Agent Purple',
    status: 'ACTIVE',
    apr: '25%',
    tradeSuccess: '22%',
    tvl: '$150,000.00',
    age: '1 day 2 hours',
  },
];

const AgentStatsData = [
  { name: 'YOUR BALANCE', value: '$0' },
  { name: 'ALL TIME EARNED', value: '$0' },
  { name: 'TVL', value: '$100,000.00' },
  { name: 'APR', value: '34%' },
];

const chartData = [0, -20, -100, 39, 100];
const chartDates = [
  '2025-05-18',
  '2025-05-19',
  '2025-05-20',
  '2025-05-21',
  '2025-05-22',
];

const AgentDetail: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();

  const agent = AgentsData.find((a) => a.id === Number(agentId));

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-4 py-2 rounded-sm"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageLayout>
      <button
        onClick={() => navigate('/agents')}
        className=" flex items-center text-token-price-header"
      >
        BACK
      </button>

      <div className="block md:hidden">
        <p className="mb-16 text-token-price">{agent.name}</p>

        <div className="w-full flex flex-row">
          <button className="bg-black text-white py-3 px-2 mb-2 lg:mb-0 w-full">
            <p>Deposit</p>
          </button>
          <button className=" text-black border border-black py-3 px-2 mb-2 lg:mb-0 w-full ml-3">
            <p>Withdraw</p>
          </button>
        </div>
      </div>
      <div className="hidden md:block ">
        <div className="flex flex-row items-center justify-between mb-16">
          <p className="text-token-price">{agent.name}</p>

          <div className="flex flex-row w-80  justify-end">
            <button className="bg-black text-white py-2 px-4 ">
              <p>Deposit</p>
            </button>
            <button className=" text-black border border-black py-2 px-4  ml-3">
              <p>Withdraw</p>
            </button>
          </div>
        </div>
      </div>
      <AgentStats stats={AgentStatsData} />

      <div>
        <p className="text-account-balance mb-4">P&L</p>
        <LazyPnlLineChart data={chartData} dates={chartDates} />
      </div>
    </PageLayout>
  );
};

export default AgentDetail;
