import React, { useState } from 'react';
import LazyPnlLineChart from '../components/LazyPnlLineChart';
import AgentStats from '../components/AgentStats';
import PageLayout from '../components/PageLayout';
import AgentCard from '../components/AgentCard';
import { Bots, Stats } from '../data/mockData';

// Vault stats data
const VaultStatsData = [
  { name: 'TVL', value: '$100,000.00' },
  { name: 'APR', value: '34%' },
  { name: 'YOUR DEPOSITS', value: '$0' },
  { name: 'ALL TIME EARNED', value: '$0' },
];

const chartData = [0, -20, -100, 39, 100];
const chartDates = [
  '2025-05-18',
  '2025-05-19',
  '2025-05-20',
  '2025-05-21',
  '2025-05-22',
];

const VaultPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vault' | 'your' | 'about' | 'agents'>('vault');
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'all'>('all');

  return (
    <PageLayout>
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-token-price mb-2">Vault</h1>
        <p className="text-gray-500 text-sm">Manage your vault investments and track performance</p>
      </div>

      {/* Action Buttons - Mobile */}
      <div className="block md:hidden mb-8">
        <div className="flex space-x-3">
          <button className="bg-black text-white py-3 px-6 rounded-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex-1">
            Deposit
          </button>
          <button className="border-2 border-black text-black py-3 px-6 rounded-sm font-medium hover:bg-black hover:text-white transition-all duration-200 flex-1">
            Withdraw
          </button>
        </div>
      </div>
      
      {/* Action Buttons - Desktop */}
      <div className="hidden md:block mb-12">
        <div className="flex justify-end space-x-4">
          <button className="bg-black text-white py-3 px-8 rounded-sm font-medium hover:bg-gray-800 transition-colors duration-200">
            Deposit
          </button>
          <button className="border-2 border-black text-black py-3 px-8 rounded-sm font-medium hover:bg-black hover:text-white transition-all duration-200">
            Withdraw
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="mb-16">
        <h2 className="text-lg font-normal text-gray-600 mb-6">Vault Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VaultStatsData.map((stat, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-sm font-normal text-gray-500 mb-2">{stat.name}</p>
              <p className="text-2xl font-medium text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section with Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-normal text-gray-600 mb-8">Vault Management</h2>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
              activeTab === 'vault'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
            }`}
          >
            Vault Performance
          </button>
          <button
            onClick={() => setActiveTab('your')}
            className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
              activeTab === 'your'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
            }`}
          >
            Your Performance
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
              activeTab === 'agents'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
            }`}
          >
            Your Agents
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
              activeTab === 'about'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
            }`}
          >
            How It Works
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-normal text-gray-600 mb-3">Strategy Overview</h3>
              <p className="text-gray-500 leading-relaxed">
                This vault provides liquidity through multiple market making strategies, 
                performs liquidations, and accrues platform fees. Our diversified approach 
                ensures consistent returns while managing risk effectively.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-normal text-gray-600">Vault P&L</h3>
                {/* Time Filter */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTimeFilter('day')}
                    className={`px-3 py-1 text-sm rounded ${
                      timeFilter === 'day'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setTimeFilter('week')}
                    className={`px-3 py-1 text-sm rounded ${
                      timeFilter === 'week'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setTimeFilter('all')}
                    className={`px-3 py-1 text-sm rounded ${
                      timeFilter === 'all'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Time
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <LazyPnlLineChart data={chartData} dates={chartDates} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'your' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-normal text-gray-600 mb-3">Personal Performance</h3>
              <p className="text-gray-500 leading-relaxed">
                Track your personal performance and earnings from this vault. Monitor your 
                investment growth, understand your returns, and make informed decisions 
                about your portfolio.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-normal text-gray-600">Your P&L</h3>
                {/* Time Filter */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTimeFilter('day')}
                    className={`px-3 py-1 text-sm rounded ${
                      timeFilter === 'day'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setTimeFilter('week')}
                    className={`px-3 py-1 text-sm rounded ${
                      timeFilter === 'week'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setTimeFilter('all')}
                    className={`px-3 py-1 text-sm rounded ${
                      timeFilter === 'all'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All Time
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <LazyPnlLineChart data={chartData} dates={chartDates} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-normal text-gray-600 mb-3">Your Agents</h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Monitor and manage your active trading agents. Track their performance, 
                understand their strategies, and optimize your portfolio allocation.
              </p>
            </div>
            <div>
              <AgentStats stats={Stats} />
              <div className="mt-8">
                <p className="text-agent-header mb-4">Your Agents</p>
                <AgentCard agents={Bots} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-normal text-gray-600 mb-3">How the Vault Works</h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Our vault operates as a sophisticated liquidity management system that combines 
                multiple strategies to generate consistent returns while managing risk.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-normal text-gray-600 mb-2">Market Making Strategies</h4>
                  <p className="text-gray-500 text-sm">
                    The vault employs advanced market making algorithms across multiple asset pairs, 
                    providing liquidity to exchanges and earning spreads on trades.
                  </p>
                </div>
                <div>
                  <h4 className="font-normal text-gray-600 mb-2">Liquidation Management</h4>
                  <p className="text-gray-500 text-sm">
                    Automated systems monitor positions and execute liquidations when necessary, 
                    protecting capital and maintaining portfolio health.
                  </p>
                </div>
                <div>
                  <h4 className="font-normal text-gray-600 mb-2">Platform Fee Accrual</h4>
                  <p className="text-gray-500 text-sm">
                    By providing essential services to the ecosystem, the vault earns a portion 
                    of platform fees, creating an additional revenue stream.
                  </p>
                </div>
                <div>
                  <h4 className="font-normal text-gray-600 mb-2">Risk Management</h4>
                  <p className="text-gray-500 text-sm">
                    Diversified strategies and automated risk controls ensure stable performance 
                    even during market volatility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default VaultPage;
