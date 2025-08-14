import { useState } from 'react';
import {
  BotEntityDto,
  TradesDataDto,
  TradeAnalyticsDto,
  CreateBotDto,
} from 'src/api';
import { createDefaultApiClient } from '@/services/apiClient';

const getBotsApi = () => {
  const { botsApi } = createDefaultApiClient();
  return botsApi;
};

export function useBotApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBots = async (): Promise<BotEntityDto[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      const response = await api.botsControllerGetAllBots();
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to load bots: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBotDetails = async (botId: string): Promise<BotEntityDto> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      const response = await api.botsControllerGetBot(botId);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to load bot details: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBotPerformance = async (
    botId: string,
  ): Promise<TradeAnalyticsDto> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      const response = await api.botsControllerGetTradePerformance(botId);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to load performance data: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBotTrades = async (botId: string): Promise<TradesDataDto> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      const response = await api.botsControllerGetTrades(botId);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to load trades data: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const createBot = async (
    createBotDto: CreateBotDto,
  ): Promise<BotEntityDto> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      const response = await api.botsControllerCreateBot(createBotDto);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to create bot: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const startBot = async (botId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      await api.botsControllerStartBot(botId);
    } catch (err: any) {
      const errorMsg = `Failed to start bot: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseBot = async (botId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      await api.botsControllerPauseBot(botId);
    } catch (err: any) {
      const errorMsg = `Failed to pause bot: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const resumeBot = async (botId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      await api.botsControllerResumeBot(botId);
    } catch (err: any) {
      const errorMsg = `Failed to resume bot: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const stopBot = async (botId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      await api.botsControllerStopBot(botId);
    } catch (err: any) {
      const errorMsg = `Failed to stop bot: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBotStrategy = async (
    botId: string,
    strategyConfig: any,
  ): Promise<BotEntityDto> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getBotsApi();
      const response = await api.botsControllerUpdateStrategyConfig(
        botId,
        strategyConfig,
      );
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to update bot strategy: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchBots,
    fetchBotDetails,
    fetchBotPerformance,
    fetchBotTrades,
    createBot,
    startBot,
    pauseBot,
    resumeBot,
    stopBot,
    updateBotStrategy,
  };
}
