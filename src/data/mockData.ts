export const Bots = [
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
];

export const Stats = [
  { name: 'ACTIVE AGENTS', value: '3' },
  { name: 'CULLED AGENTS', value: '3' },
  { name: 'IQ', value: '43' },
  { name: '24H VOLUME', value: '$91.80' },
  { name: 'SUCCESSFUL TRADES', value: '32%' },
  { name: 'INDICATORS', value: 'MA,RSI,CMF' },
];

export const TokenData = { price: '442.03', change: '-0.01%' };

export const EvolutionData = {
  currentStage: 'Foetus',
  nextStage: 'Born',
  progress: 40,
  statusColor: 'bg-statuspending',
};

export const cullTimestamp = Date.now() + 24 * 60 * 60 * 1000;
