import { useState } from 'react';
import { withRetry } from '../utils/retry';
import {
  CreateWalletDto,
  WalletEntityDto,
  WalletSnapshotResponseDto,
} from 'src/api';
import { createDefaultApiClient } from '../services/apiClient';

const getWalletsApi = () => {
  const { walletsApi } = createDefaultApiClient();
  return walletsApi;
};

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

const walletCache: Record<string, CacheItem<any>> = {};

function setCache<T>(key: string, data: T, expiry = 60000): void {
  walletCache[key] = {
    data,
    timestamp: Date.now(),
    expiry,
  };
}

function getCache<T>(key: string): T | null {
  const item = walletCache[key];
  if (!item) return null;
  if (Date.now() - item.timestamp > item.expiry) {
    delete walletCache[key];
    return null;
  }
  return item.data as T;
}

export function useWalletApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallets = async (
    userId: string,
    useCache = true,
  ): Promise<WalletEntityDto[]> => {
    const cacheKey = `user-wallets-${userId}`;
    if (useCache) {
      const cachedData = getCache<WalletEntityDto[]>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }
    setIsLoading(true);
    setError(null);
    try {
      const api = getWalletsApi();
      const response = await api.walletControllerFindAll(userId);
      setCache(cacheKey, response.data, 30000);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to load wallets: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWalletDetails = async (
    walletId: string,
    useCache = true,
  ): Promise<WalletEntityDto> => {
    const cacheKey = `wallet-details-${walletId}`;
    if (useCache) {
      const cachedData = getCache<WalletEntityDto>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }
    setIsLoading(true);
    setError(null);
    try {
      const api = getWalletsApi();
      const response = await api.walletControllerFindOne(walletId);
      setCache(cacheKey, response.data, 30000);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to load wallet details: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWalletSnapshots = async (
    walletId: string,
    fromDate: string,
    useCache = true,
  ): Promise<WalletSnapshotResponseDto[]> => {
    const cacheKey = `wallet-snapshots-${walletId}-${fromDate}`;
    if (useCache) {
      const cachedData = getCache<WalletSnapshotResponseDto[]>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }
    setIsLoading(true);
    setError(null);
    try {
      const api = getWalletsApi();
      const response = await api.walletControllerGetSnapshotsRange(
        walletId,
        fromDate,
      );
      setCache(cacheKey, response.data, 30000);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to load wallet snapshots: ${err.message}`;
      setError(errorMsg);
      console.error(err);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const createWallet = async (
    createRequest: CreateWalletDto,
  ): Promise<WalletEntityDto> => {
    setIsLoading(true);
    setError(null);
    try {
      const api = getWalletsApi();
      const response = await api.walletControllerCreate(createRequest);
      return response.data;
    } catch (err: any) {
      const errorMsg = `Failed to create wallet: ${err.message}`;
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
    fetchWallets: (userId: string, useCache = true) =>
      withRetry(() => fetchWallets(userId, useCache)),
    fetchWalletDetails: (walletId: string, useCache = true) =>
      withRetry(() => fetchWalletDetails(walletId, useCache)),
    fetchWalletSnapshots: (
      walletId: string,
      fromDate: string,
      useCache = true,
    ) => withRetry(() => fetchWalletSnapshots(walletId, fromDate, useCache)),
    createWallet: (createRequest: CreateWalletDto) =>
      withRetry(() => createWallet(createRequest)),
    clearCache: () => {
      Object.keys(walletCache).forEach((key) => delete walletCache[key]);
    },
  };
}
