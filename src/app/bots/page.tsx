'use client';

import { useState, useEffect } from 'react';
import { BotEntityDto, TradesDataDto, TradeAnalyticsDto, WalletSnapshotResponseDto, CreateBotDto, BotStatus } from 'src/api';
import { BotCreateView } from 'src/components/bots/BotCreateView';
import { BotDetailView } from 'src/components/bots/BotDetailView';
import { BotListView } from 'src/components/bots/BotListView';
import { BotPerformanceTab } from 'src/components/bots/BotPerformanceTab';
import { BotStrategyTab } from 'src/components/bots/BotStrategyTab';
import { BotTradesTab } from 'src/components/bots/BotTradesTab';
import { DEFAULT_CREATE_BOT_DTO } from 'src/components/bots/BotTypes';
import { BotWalletTab } from 'src/components/bots/BotWalletTab';
import { ErrorMessage } from 'src/components/common/ErrorMessage';
import { LoadingIndicator } from 'src/components/common/LoadingIndicator';
import { TabContent } from 'src/components/common/TabContent';
import { useBotApi } from 'src/hooks/useBotApi';
import { useWalletApi } from 'src/hooks/useWalletApi';

export default function BotsPage() {
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('performance');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // API state
  const [bots, setBots] = useState<BotEntityDto[]>([]);
  const [selectedBot, setSelectedBot] = useState<BotEntityDto | null>(null);
  const [botTrades, setBotTrades] = useState<TradesDataDto | null>(null);
  const [botPerformance, setBotPerformance] =
    useState<TradeAnalyticsDto | null>(null);
  const [walletSnapshots, setWalletSnapshots] = useState<
    WalletSnapshotResponseDto[] | null
  >(null);

  // Bot form state
  const [botDto, setBotDto] = useState<CreateBotDto>({
    ...DEFAULT_CREATE_BOT_DTO,
  });

  // Use custom API hooks
  const {
    isLoading,
    error,
    fetchBots: apiFetchBots,
    fetchBotDetails: apiFetchBotDetails,
    fetchBotPerformance: apiFetchPerformance,
    fetchBotTrades: apiFetchTrades,
    createBot: apiCreateBot,
    startBot,
    pauseBot,
    resumeBot,
    stopBot: apiStopBot,
    updateBotStrategy,
  } = useBotApi();

  const { fetchWalletSnapshots: apiFetchWalletSnapshots } = useWalletApi();

  // Load all bots on component mount
  useEffect(() => {
    fetchBots();
  }, []);

  // Load selected bot details when ID changes or active tab changes
  useEffect(() => {
    if (selectedBotId) {
      fetchBotDetails(selectedBotId);
    }
  }, [selectedBotId, activeTab]);

  const fetchBots = async () => {
    try {
      const botsList = await apiFetchBots();
      setBots(botsList);
    } catch (_err) {
      // Error handled by the hook
    }
  };

  const fetchBotDetails = async (botId: string) => {
    try {
      const bot = await apiFetchBotDetails(botId);
      setSelectedBot(bot);

      // Fetch tab-specific data
      if (activeTab === 'performance') {
        const performance = await apiFetchPerformance(botId);
        setBotPerformance(performance);
      } else if (activeTab === 'trades') {
        const trades = await apiFetchTrades(botId);
        setBotTrades(trades);
      } else if (activeTab === 'wallet' && bot.walletId) {
        // Get data from 1 hour ago for initial view
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        const fromDate = oneHourAgo.toISOString();

        const snapshots = await apiFetchWalletSnapshots(bot.walletId, fromDate);
        setWalletSnapshots(snapshots);
      }
    } catch (_err) {
      // Error handled by the hook
    }
  };

  // Change active tab
  const handleTabChange = async (tab: string) => {
    setActiveTab(tab);
    if (selectedBotId && selectedBot) {
      try {
        if (tab === 'performance') {
          const performance = await apiFetchPerformance(selectedBotId);
          setBotPerformance(performance);
        } else if (tab === 'trades') {
          const trades = await apiFetchTrades(selectedBotId);
          setBotTrades(trades);
        } else if (tab === 'wallet' && selectedBot.walletId) {
          // Get data from 1 hour ago as default view
          const oneHourAgo = new Date();
          oneHourAgo.setHours(oneHourAgo.getHours() - 1);
          const fromDate = oneHourAgo.toISOString();

          const snapshots = await apiFetchWalletSnapshots(
            selectedBot.walletId,
            fromDate,
          );
          setWalletSnapshots(snapshots);
        }
      } catch (_err) {
        // Error handled by the hook
      }
    }
  };

  // Select a bot to view details
  const handleBotSelect = (botId: string) => {
    setSelectedBotId(botId);
    setActiveTab('performance'); // Reset to performance tab when selecting a new bot
  };

  // Return to the bot list view
  const handleBackToList = () => {
    setSelectedBotId(null);
    setSelectedBot(null);
    setShowCreateForm(false);
    setBotTrades(null);
    setBotPerformance(null);
  };

  // Show the create bot form
  const handleCreateBot = () => {
    setShowCreateForm(true);
    setSelectedBotId(null);
  };

  // Update local form state
  const handleBotChange = (updatedBot: CreateBotDto) => {
    setBotDto(updatedBot);
  };

  // Create a new bot
  const handleCreateBotSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await apiCreateBot(botDto); // Use botDto from state
      setBotDto({ ...DEFAULT_CREATE_BOT_DTO });
      setShowCreateForm(false);
      fetchBots();
    } catch (_err) {
      // Error handled by the hook
    }
  };

  // Toggle bot status (pause/resume)
  const handleToggleBotStatus = async (
    bot: BotEntityDto,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();

    try {
      if (bot.status === BotStatus.Active) {
        await pauseBot(bot.id);
      } else if (bot.status === BotStatus.Paused) {
        await resumeBot(bot.id);
      } else if (bot.status === BotStatus.Stopped) {
        await startBot(bot.id);
      }
      fetchBots();
    } catch (err) {
      // Error handled by the hook
    }
  };

  // Stop a bot
  const handleStopBot = async (botId: string) => {
    try {
      await apiStopBot(botId);
      if (selectedBotId === botId) {
        fetchBotDetails(botId);
      }
      fetchBots();
    } catch (err) {
      // Error handled by the hook
    }
  };

  // Handle update of bot strategy
  const handleUpdateStrategy = async (
    botId: string,
    strategyConfig: any,
  ): Promise<void> => {
    try {
      await updateBotStrategy(botId, strategyConfig);
      if (selectedBotId === botId) {
        fetchBotDetails(botId);
      }
    } catch (err) {
      // Error handled by the hook
    }
  };

  return (
    <div>
      <LoadingIndicator isLoading={isLoading} />
      <ErrorMessage message={error} />

      {!selectedBotId && !showCreateForm ? (
        <BotListView
          bots={bots}
          isLoading={isLoading}
          onBotSelect={handleBotSelect}
          onCreateBot={handleCreateBot}
          onToggleStatus={handleToggleBotStatus}
        />
      ) : showCreateForm ? (
        <BotCreateView
          botDto={botDto}
          isLoading={isLoading}
          onBack={handleBackToList}
          onChange={handleBotChange}
          onSubmit={handleCreateBotSubmit}
        />
      ) : (
        selectedBot && (
          <BotDetailView
            bot={selectedBot}
            isLoading={isLoading}
            onBack={handleBackToList}
            onToggleStatus={handleToggleBotStatus}
            onStopBot={handleStopBot}
            onTabChange={handleTabChange}
            activeTab={
              activeTab as 'performance' | 'settings' | 'trades' | 'wallet'
            }
          >
            <TabContent
              isLoading={isLoading && activeTab === 'performance'}
              loadingMessage="Loading performance data..."
            >
              {activeTab === 'performance' && botPerformance && (
                <BotPerformanceTab performance={botPerformance} />
              )}
            </TabContent>

            <TabContent
              isLoading={isLoading && activeTab === 'settings'}
              loadingMessage="Loading strategy data..."
            >
              {activeTab === 'settings' && (
                <BotStrategyTab
                  bot={selectedBot}
                  onUpdateStrategy={handleUpdateStrategy}
                />
              )}
            </TabContent>

            <TabContent
              isLoading={isLoading && activeTab === 'trades'}
              loadingMessage="Loading trades data..."
            >
              {activeTab === 'trades' && botTrades && (
                <BotTradesTab trades={botTrades} />
              )}
            </TabContent>

            <TabContent
              isLoading={isLoading && activeTab === 'wallet'}
              loadingMessage="Loading wallet data..."
            >
              {activeTab === 'wallet' && (
                <BotWalletTab snapshots={walletSnapshots} />
              )}
            </TabContent>
          </BotDetailView>
        )
      )}
    </div>
  );
}
