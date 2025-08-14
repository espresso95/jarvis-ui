import { TradesDataDto, TradeDtoStateEnum } from 'src/api';
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

interface BotTradesTabProps {
  trades: TradesDataDto | null;
}

export function BotTradesTab({ trades }: BotTradesTabProps) {
  if (!trades || trades.trades.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        No trades found for this bot.
      </Box>
    );
  }

  // Get trade state color
  const getStateColor = (state: TradeDtoStateEnum) => {
    switch (state) {
      case TradeDtoStateEnum.Open:
        return 'primary';
      case TradeDtoStateEnum.Closed:
        return 'default';
      default:
        return 'default';
    }
  };

  // Get PnL color
  const getPnLColor = (pnl: number | undefined) => {
    if (pnl === undefined) return 'text.primary';
    return pnl > 0 ? 'success.main' : pnl < 0 ? 'error.main' : 'text.primary';
  };

  // Derive all column names from the very first trade
  const columns = React.useMemo(
    () =>
      trades.trades.length
        ? Object.keys(trades.trades[0] as unknown as Record<string, unknown>)
        : [],
    [trades],
  );

  // Generic formatter
  const formatValue = (key: string, value: unknown) => {
    if (value === null || value === undefined) return '—';

    // date / time columns
    if (/(time|date)$/i.test(key.toLowerCase())) {
      try {
        return new Date(value as string).toLocaleString();
      } catch {
        /* fall through */
      }
    }

    if (typeof value === 'number') return (value as number).toFixed(4);

    return String(value);
  };

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Recent Trades
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col}
                  sx={{ fontWeight: 500, textTransform: 'capitalize' }}
                >
                  {col.replace(/([A-Z])/g, ' $1').trim()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.trades.map((trade) => (
              <TableRow
                key={trade.tradeId}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      ...(col.toLowerCase() === 'pnl' && {
                        color: getPnLColor((trade as any)[col]),
                      }),
                    }}
                  >
                    {col.toLowerCase() === 'state' ? (
                      <Chip
                        label={String((trade as any)[col])}
                        color={getStateColor(
                          (trade as any)[col] as TradeDtoStateEnum,
                        )}
                        size="small"
                        variant="outlined"
                      />
                    ) : col.toLowerCase() === 'pnl' &&
                      (trade as any)[col] !== undefined ? (
                      <>
                        {(trade as any)[col] > 0 ? '+' : ''}
                        {typeof (trade as any)[col] === 'number'
                          ? ((trade as any)[col] as number).toFixed(4)
                          : (trade as any)[col]}{' '}
                        {'$'}
                      </>
                    ) : (
                      formatValue(col, (trade as any)[col])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
