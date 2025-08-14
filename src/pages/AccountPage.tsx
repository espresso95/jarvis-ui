import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LazyPnlLineChart from '../components/LazyPnlLineChart';
import AgentStats from '../components/AgentStats';
import PageLayout from '../components/PageLayout';
import AgentCard from '../components/AgentCard';

const UserData = [
  { name: 'TOTAL BALANCE', value: '$0' },
  { name: 'PNL', value: '$0' },
  { name: 'ACTIVE AGENTS', value: '7' },
  { name: 'WIN RATE', value: '34%' },
];

const chartData = [0, -20, -100, 39, 100];
const chartDates = [
  '2025-05-18',
  '2025-05-19',
  '2025-05-20',
  '2025-05-21',
  '2025-05-22',
];

const Bots = [
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
    status: 'CULLED',
    apr: '25%',
    tradeSuccess: '22%',
    tvl: '$150,000.00',
    age: '1 day 2 hours',
  },
  {
    id: 3,
    name: 'Agent Green',
    status: 'CULLED',
    apr: '25%',
    tradeSuccess: '22%',
    tvl: '$300,000.00',
    age: '1 day 2 hours',
  },
];

const AccountPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <p className="mb-16 text-token-price mt-4">Account</p>

      <AgentStats stats={UserData} />

      <div>
        <p className="text-account-balance mb-4">P&L</p>
        <LazyPnlLineChart data={chartData} dates={chartDates} />
      </div>
      <p className="text-agent-header mt-12">Your Agents</p>
      <AgentCard agents={Bots} />
    </PageLayout>
  );
};

export default AccountPage;
