import { CreateBotDto } from 'src/api';
import { createMarketDataConfig } from './BotTypes';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  Slider,
  Paper,
} from '@mui/material';

interface MarketDataConfigFormProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

// Helper type for the market data config
interface CustomMarketDataConfig {
  useRealData: boolean;
  marketDataFeedId?: string;
  historicalConfig?: {
    startDate: string;
    endDate: string;
    speedMultiplier?: number;
  };
}

export function MarketDataConfigForm({
  botDto,
  onChange,
}: MarketDataConfigFormProps) {
  // Helper functions to extract values from the DTO
  const getUseRealData = (): boolean => {
    // Handle the case where useRealData is explicitly set to false
    const config = botDto.marketData?.marketDataConfig as
      | CustomMarketDataConfig
      | undefined;
    return config?.useRealData !== false;
  };

  const getMarketDataFeedId = (): string => {
    return (
      botDto.marketData?.marketDataFeedId ||
      (botDto.marketData?.marketDataConfig as CustomMarketDataConfig)
        ?.marketDataFeedId ||
      ''
    );
  };

  const getHistoricalStartDate = (): string => {
    const config = botDto.marketData?.marketDataConfig as
      | CustomMarketDataConfig
      | undefined;
    if (config?.historicalConfig?.startDate) {
      // Format the date as YYYY-MM-DD for the input field
      return config.historicalConfig.startDate.split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  };

  const getHistoricalEndDate = (): string => {
    const config = botDto.marketData?.marketDataConfig as
      | CustomMarketDataConfig
      | undefined;
    if (config?.historicalConfig?.endDate) {
      // Format the date as YYYY-MM-DD for the input field
      return config.historicalConfig.endDate.split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  };

  const getHistoricalSpeedMultiplier = (): number => {
    const config = botDto.marketData?.marketDataConfig as
      | CustomMarketDataConfig
      | undefined;
    return config?.historicalConfig?.speedMultiplier || 1;
  };

  // Handle form field changes
  const handleUseRealDataChange = (useRealData: boolean) => {
    const updatedBot = { ...botDto };
    updatedBot.marketData = createMarketDataConfig(useRealData, {
      marketDataFeedId: getMarketDataFeedId(),
      startDate: getHistoricalStartDate(),
      endDate: getHistoricalEndDate(),
      speedMultiplier: getHistoricalSpeedMultiplier(),
    });

    onChange(updatedBot);
  };

  const handleMarketDataFeedIdChange = (marketDataFeedId: string) => {
    const updatedBot = { ...botDto };
    updatedBot.marketData = createMarketDataConfig(getUseRealData(), {
      marketDataFeedId,
      startDate: getHistoricalStartDate(),
      endDate: getHistoricalEndDate(),
      speedMultiplier: getHistoricalSpeedMultiplier(),
    });

    onChange(updatedBot);
  };

  const handleStartDateChange = (startDate: string) => {
    const updatedBot = { ...botDto };
    updatedBot.marketData = createMarketDataConfig(getUseRealData(), {
      marketDataFeedId: getMarketDataFeedId(),
      startDate: `${startDate}T00:00:00.000Z`,
      endDate: getHistoricalEndDate(),
      speedMultiplier: getHistoricalSpeedMultiplier(),
    });

    onChange(updatedBot);
  };

  const handleEndDateChange = (endDate: string) => {
    const updatedBot = { ...botDto };
    updatedBot.marketData = createMarketDataConfig(getUseRealData(), {
      marketDataFeedId: getMarketDataFeedId(),
      startDate: getHistoricalStartDate(),
      endDate: `${endDate}T23:59:59.999Z`,
      speedMultiplier: getHistoricalSpeedMultiplier(),
    });

    onChange(updatedBot);
  };

  const handleSpeedMultiplierChange = (speedMultiplier: number) => {
    const updatedBot = { ...botDto };
    updatedBot.marketData = createMarketDataConfig(getUseRealData(), {
      marketDataFeedId: getMarketDataFeedId(),
      startDate: getHistoricalStartDate(),
      endDate: getHistoricalEndDate(),
      speedMultiplier,
    });

    onChange(updatedBot);
  };

  return (
    <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          color: 'text.secondary',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Market Data Configuration
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getUseRealData()}
                  onChange={(e) => handleUseRealDataChange(e.target.checked)}
                />
              }
              label="Use real-time market data"
            />

            {!getUseRealData() && (
              <TextField
                fullWidth
                label="Market Data Feed ID (Optional)"
                value={getMarketDataFeedId()}
                onChange={(e) => handleMarketDataFeedIdChange(e.target.value)}
                helperText="Leave blank to use default market data feed"
              />
            )}

            {!getUseRealData() && (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Historical Data Settings
                </Typography>

                <Stack spacing={3} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={getHistoricalStartDate()}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    value={getHistoricalEndDate()}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Simulation Speed (x{getHistoricalSpeedMultiplier()})
                    </Typography>
                    <Slider
                      value={getHistoricalSpeedMultiplier()}
                      onChange={(_, value) =>
                        handleSpeedMultiplierChange(value as number)
                      }
                      step={1}
                      marks
                      min={1}
                      max={50}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'block' },
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            About Market Data
          </Typography>

          {getUseRealData() ? (
            <Typography variant="body2" color="text.secondary">
              Using real-time market data will connect to live cryptocurrency
              markets to fetch the latest prices and execute trades in
              real-time.
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Historical data mode allows you to backtest your strategy using
              past market data. Adjust the speed multiplier to control how
              quickly the historical data is processed.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
