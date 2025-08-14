import axios from 'axios';
import {
  PortfoliosApi,
  Configuration,
  WalletsApi,
  MarketDataFeedsApi,
  BotsApi,
} from 'src/api';

export const createApiClient = (accessToken?: string) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const isDev = import.meta.env.DEV;

  if (isDev) {
    console.log('🔧 Creating API client:', {
      baseURL: API_URL,
      hasToken: !!accessToken,
      tokenPrefix: accessToken ? accessToken.substring(0, 20) + '...' : 'none',
    });
  }

  const customAxios = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  customAxios.interceptors.request.use(
    (config) => {
      if (isDev && config.url) {
        console.log(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      }
      return config;
    },
    (error) => {
      if (isDev) {
        console.error('📡 API Request Error:', error);
      }
      return Promise.reject(error);
    }
  );

  customAxios.interceptors.response.use(
    (response) => {
      if (isDev) {
        console.log(`📡 API Response: ${response.status} ${response.config.url}`);
      }
      return response;
    },
    (error) => {
      const formattedError = {
        status: error.response?.status,
        message:
          error.response?.data?.message ||
          error.message ||
          'Network error occurred',
        isNetworkError: !error.response || error.code === 'ECONNABORTED',
      };

      if (isDev) {
        console.group('📡 API Error');
        console.error('Status:', formattedError.status);
        console.error('Message:', formattedError.message);
        console.error('Network Error:', formattedError.isNetworkError);
        console.error('Full Error:', error);
        console.groupEnd();
      }

      error.formattedError = formattedError;
      return Promise.reject(error);
    },
  );

  const config = new Configuration({
    basePath: API_URL,
    accessToken: accessToken ? `Bearer ${accessToken}` : undefined,
  });

  return {
    walletsApi: new WalletsApi(config, API_URL, customAxios),
    portfoliosApi: new PortfoliosApi(config, API_URL, customAxios),
    marketDataFeedsApi: new MarketDataFeedsApi(config, API_URL, customAxios),
    botsApi: new BotsApi(config, API_URL, customAxios),
  };
};

export const getAuthToken = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || undefined;
  }
  return undefined;
};

export const createDefaultApiClient = () => {
  const token = getAuthToken();
  return createApiClient(token);
};
