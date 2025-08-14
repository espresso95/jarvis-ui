import { CoinId } from '@/types/market';
import { Box, Grid, Typography, Button, Avatar, useTheme } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

type CoinOption = {
  id: CoinId;
  name: string;
  symbol: string;
  iconClass: string;
};

type CoinSelectorProps = {
  coinOptions: CoinOption[];
  selectedCoin: CoinId;
  marketData: Record<CoinId, { price: number; change24h: number }>;
  onSelectCoin: (coin: CoinId) => void;
};

export function CoinSelector({
  coinOptions,
  selectedCoin,
  marketData,
  onSelectCoin,
}: CoinSelectorProps) {
  const theme = useTheme();

  const getCoinSymbol = (coin: CoinId): string => {
    const symbols: Record<CoinId, string> = {
      solana: '◎',
      jupiter: 'J',
      trump: 'T',
      render: 'R',
      bonk: 'B',
    };
    return symbols[coin];
  };

  const getCoinColor = (iconClass: string): string => {
    if (iconClass && iconClass.includes('bg-')) {
      return iconClass.split('bg-')[1].split(' ')[0];
    }
    return 'transparent';
  };

  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      {coinOptions.map((coin) => {
        const isSelected = selectedCoin === coin.id;
        const change24h = marketData[coin.id].change24h;
        const isPositive = change24h >= 0;

        return (
          <Grid
            key={coin.id}
            sx={{ gridColumn: { xs: 'span 12', sm: 'span 4' } }}
          >
            <Button
              fullWidth
              onClick={() => onSelectCoin(coin.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                p: 2,
                borderRadius: 3,
                textAlign: 'left',
                height: '100%',
                backgroundColor: isSelected
                  ? 'background.paper'
                  : 'action.hover',
                border: isSelected ? 2 : 1,
                borderColor: isSelected ? 'primary.main' : 'divider',
                boxShadow: isSelected ? 1 : 0,
                '&:hover': {
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
                },
                transition: theme.transitions.create([
                  'background-color',
                  'box-shadow',
                  'border-color',
                ]),
              }}
            >
              <Avatar
                sx={{
                  bgcolor: getCoinColor(coin.iconClass),
                  mr: 1.5,
                  width: 40,
                  height: 40,
                  fontWeight: 'bold',
                }}
              >
                {getCoinSymbol(coin.id)}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight="600">{coin.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {coin.symbol}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography fontWeight="bold">
                  ${marketData[coin.id].price.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color={isPositive ? 'success.main' : 'error.main'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  {isPositive ? <ArrowDropUp /> : <ArrowDropDown />}
                  {Math.abs(change24h)}%
                </Typography>
              </Box>
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
