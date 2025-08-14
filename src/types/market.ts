export type CoinId = 'solana' | 'jupiter' | 'trump' | 'render' | 'bonk';

export type CoinData = {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  supply: string;
  allTimeHigh: number;
  allTimeHighDate: string;
};

export type MarketDataType = {
  [key in CoinId]: CoinData;
};
