import { useState, useCallback } from 'react';
import { withRetry } from '../utils/retry';
import {
  MarketDataDto,
  MarketDataFeedControllerGetSnapshotPeriodEnum,
} from 'src/api';
import { CoinId } from '@/types/market';
import { createDefaultApiClient } from '@/services/apiClient';

export interface UseMarketDataApiReturn {
  isLoading: boolean;
  error: string | null;
  marketPriceData: MarketDataDto[];
  fetchMarketData: (
    coin: CoinId,
    timeRange: MarketDataFeedControllerGetSnapshotPeriodEnum,
  ) => Promise<MarketDataDto[]>;
  clearCache: () => void;
}

const getMarketDataApi = () => {
  const { marketDataFeedsApi } = createDefaultApiClient();
  return marketDataFeedsApi;
};

export function useMarketDataApi(): UseMarketDataApiReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [marketPriceData, setMarketPriceData] = useState<MarketDataDto[]>([]);

  const getCoinMarketPair = (coin: CoinId): string => {
    const marketPairMap: Record<CoinId, string> = {
      solana: 'SOL/USDC',
      jupiter: 'JUP/USDC',
      trump: 'TRUMP/USDC',
      render: 'RENDER/USDC',
      bonk: 'BONK/USDC',
    };
    return marketPairMap[coin] || `${coin.toUpperCase()}/USDC`;
  };

  const fetchMarketData = useCallback(
    async (
      coin: CoinId,
      timeRange: MarketDataFeedControllerGetSnapshotPeriodEnum,
    ): Promise<MarketDataDto[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const marketPair = getCoinMarketPair(coin);
        const api = getMarketDataApi();
        const response = await api.marketDataFeedControllerGetSnapshot(
          timeRange,
          marketPair,
        );
        setMarketPriceData(response.data);
        return response.data;
      } catch (err: any) {
        const errorMsg = `Failed to fetch market data: ${err.message}`;
        setError(errorMsg);
        console.error(err);
        throw new Error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    isLoading,
    error,
    marketPriceData,
    fetchMarketData: (
      coin: CoinId,
      timeRange: MarketDataFeedControllerGetSnapshotPeriodEnum,
    ) => withRetry(() => fetchMarketData(coin, timeRange)),
    clearCache: () => {},
  };
}
