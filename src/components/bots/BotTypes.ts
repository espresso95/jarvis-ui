import {
  CreateBotDto,
  BotStatus,
  SMAIndicatorConfigDto,
  SMAIndicatorConfigDtoTypeEnum,
  InsufficientCashRiskDto,
  MaxTradeSizeRiskDto,
  PositionSizingRiskDto,
  PositionLimitRiskDto,
  InMemoryWalletConfigDto,
  SolanaWalletConfigDto,
  MarketDataFeedOptionsDto,
} from 'src/api';

export interface MarketDataConfigDto {
  useRealData: boolean;
  marketDataFeedId?: string;
  historicalConfig?: {
    startDate: string;
    endDate: string;
    speedMultiplier?: number;
  };
}

export const MARKET_PAIRS = [
  'SOL/USDC',
  'TRUMP/USDC',
  'RENDER/USDC',
  'JUP/USDC',
  'BONK/USDC',
  'JTO/USDC',
  'MSOL/USDC',
  'PYTH/USDC',
  'BTC/USDC',
  'ETH/USDC',
];

export const DEFAULT_CREATE_BOT_DTO: CreateBotDto = {
  name: '',
  description: '',
  userId: '',
  marketPairs: ['SOL/USDC'],
  strategyConfig: {
    indicatorConfigs: [
      {
        type: SMAIndicatorConfigDtoTypeEnum.Sma,
        options: {
          period: 14,
        },
      },
    ],
    riskConfigs: [
      {
        type: 'insufficientCash',
        options: {},
      },
      {
        type: 'maxTradeSize',
        options: {
          maxTradeSizePct: 0.05,
        },
      },
      {
        type: 'positionSizing',
        options: {
          perTradeRiskPct: 0.02,
          stopLossPct: 0.03,
        },
      },
      {
        type: 'positionLimit',
        options: {
          maxPositionCount: 5,
        },
      },
    ],
    orderStrategyConfig: {
      fixedBuyPercentage: 0.2,
      sellProfitThreshold: 0.05,
    },
  },
  walletConfig: {
    type: 'in-memory',
    options: {
      initialCash: 1000,
    },
  },
  marketData: {
    marketDataConfig: {
      useRealData: true,
    },
  },
};

export const createIndicatorConfigForStrategy = (
  strategyType: string,
): SMAIndicatorConfigDto[] => {
  return [
    {
      type: SMAIndicatorConfigDtoTypeEnum.Sma,
      options: {
        period: strategyType === 'sma' ? 14 : strategyType === 'macd' ? 12 : 21,
      },
    },
  ];
};

export const createRiskConfigsForLevel = (
  riskLevel: 'low' | 'medium' | 'high',
  stopLossPercent: number,
  maxOpenTrades: number,
  maxTradeSizePct?: number,
): (
  | InsufficientCashRiskDto
  | MaxTradeSizeRiskDto
  | PositionSizingRiskDto
  | PositionLimitRiskDto
)[] => {
  const perTradeRiskMap = {
    low: 0.01,
    medium: 0.02,
    high: 0.03,
  };

  const maxTradeSizeMap = {
    low: 0.03,
    medium: 0.05,
    high: 0.1,
  };

  return [
    {
      type: 'insufficientCash',
      options: {},
    },
    {
      type: 'maxTradeSize',
      options: {
        maxTradeSizePct:
          maxTradeSizePct !== undefined
            ? maxTradeSizePct
            : maxTradeSizeMap[riskLevel],
      },
    },
    {
      type: 'positionSizing',
      options: {
        perTradeRiskPct: perTradeRiskMap[riskLevel],
        stopLossPct: stopLossPercent / 100,
      },
    },
    {
      type: 'positionLimit',
      options: {
        maxPositionCount: maxOpenTrades,
      },
    },
  ];
};

export const createWalletConfig = (
  type: 'in-memory' | 'solana-wallet',
  options: {
    initialCash?: number;
    privateKey?: string;
    rpcUrl?: string;
    syncIntervalMs?: number;
  },
): InMemoryWalletConfigDto | SolanaWalletConfigDto => {
  if (type === 'in-memory') {
    return {
      type: 'in-memory',
      options: {
        initialCash: options.initialCash || 1000,
      },
    };
  } else {
    return {
      type: 'solana-wallet',
      options: {
        privateKey: options.privateKey || '',
        rpcUrl: options.rpcUrl,
        syncIntervalMs: options.syncIntervalMs,
      },
    };
  }
};

// Helper for creating market data configuration
export const createMarketDataConfig = (
  useRealData: boolean,
  options?: {
    marketDataFeedId?: string;
    startDate?: string;
    endDate?: string;
    speedMultiplier?: number;
  },
): MarketDataFeedOptionsDto => {
  const marketDataConfig = {
    useRealData,
    marketDataFeedId: options?.marketDataFeedId,
  } as MarketDataConfigDto;

  if (!useRealData && options) {
    marketDataConfig.historicalConfig = {
      startDate: options.startDate || new Date().toISOString(),
      endDate: options.endDate || new Date().toISOString(),
      speedMultiplier: options.speedMultiplier || 1,
    };
  }

  return {
    marketDataConfig,
  };
};

// Helper for bot status display
export const getBotStatusDisplay = (
  status: BotStatus,
): { label: string; color: string } => {
  switch (status) {
    case BotStatus.Active:
      return { label: 'Active', color: 'green' };
    case BotStatus.Paused:
      return { label: 'Paused', color: 'yellow' };
    case BotStatus.Stopped:
      return { label: 'Stopped', color: 'gray' };
    case BotStatus.Error:
      return { label: 'Error', color: 'red' };
    default:
      return { label: 'Unknown', color: 'gray' };
  }
};

export const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};
