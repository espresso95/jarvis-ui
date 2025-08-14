import {
  Box,
  Typography,
  Slider,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { CreateBotDto } from 'src/api';

interface OrderStrategyConfigFormProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

/**
 * OrderStrategyConfigForm component for configuring order execution parameters
 *
 * This component allows users to configure:
 * - Fixed Buy Percentage: The percentage of available cash to use for each buy order
 * - Sell Profit Threshold: The minimum profit percentage required before selling a position
 */
export function OrderStrategyConfigForm({
  botDto,
  onChange,
}: OrderStrategyConfigFormProps) {
  // Helper functions to get current values
  const getFixedBuyPercentage = (): number => {
    return (
      (botDto.strategyConfig.orderStrategyConfig?.fixedBuyPercentage || 0.03) *
      100
    );
  };

  const getSellProfitThreshold = (): number => {
    return (
      (botDto.strategyConfig.orderStrategyConfig?.sellProfitThreshold || 0.05) *
      100
    );
  };

  // Update handlers
  const handleFixedBuyChange = (value: number) => {
    const updatedBot = { ...botDto };
    if (updatedBot.strategyConfig.orderStrategyConfig) {
      updatedBot.strategyConfig.orderStrategyConfig.fixedBuyPercentage =
        value / 100;
    } else {
      updatedBot.strategyConfig.orderStrategyConfig = {
        fixedBuyPercentage: value / 100,
        sellProfitThreshold: 0.05, // Default value
      };
    }
    onChange(updatedBot);
  };

  const handleSellProfitChange = (value: number) => {
    const updatedBot = { ...botDto };
    if (updatedBot.strategyConfig.orderStrategyConfig) {
      updatedBot.strategyConfig.orderStrategyConfig.sellProfitThreshold =
        value / 100;
    } else {
      updatedBot.strategyConfig.orderStrategyConfig = {
        fixedBuyPercentage: 0.03, // Default value
        sellProfitThreshold: value / 100,
      };
    }
    onChange(updatedBot);
  };

  // Value formatters
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Configure how orders are executed, including buy/sell percentages and
        profit thresholds.
      </Typography>

      <Stack spacing={4} sx={{ mt: 3 }}>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography id="fixed-buy-slider" variant="body2" gutterBottom>
              Fixed Buy Percentage
            </Typography>
            <TextField
              value={getFixedBuyPercentage()}
              onChange={(e) => handleFixedBuyChange(Number(e.target.value))}
              size="small"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 1, max: 100, step: 1 },
              }}
              sx={{ width: '100px' }}
            />
          </Stack>
          <Slider
            aria-labelledby="fixed-buy-slider"
            value={getFixedBuyPercentage()}
            onChange={(_, value) => handleFixedBuyChange(value as number)}
            step={1}
            min={1}
            max={100}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPercentage}
          />
          <Typography variant="caption" color="text.secondary">
            Percentage of available cash to use for each buy order
          </Typography>
        </Box>

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography
              id="profit-threshold-slider"
              variant="body2"
              gutterBottom
            >
              Sell Profit Threshold
            </Typography>
            <TextField
              value={getSellProfitThreshold()}
              onChange={(e) => handleSellProfitChange(Number(e.target.value))}
              size="small"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 0.5, max: 50, step: 0.5 },
              }}
              sx={{ width: '100px' }}
            />
          </Stack>
          <Slider
            aria-labelledby="profit-threshold-slider"
            value={getSellProfitThreshold()}
            onChange={(_, value) => handleSellProfitChange(value as number)}
            step={0.5}
            min={0.5}
            max={50}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPercentage}
          />
          <Typography variant="caption" color="text.secondary">
            Minimum profit percentage required before selling a position
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
