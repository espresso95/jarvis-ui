import {
  Box,
  Typography,
  Button,
  Card,
  TextField,
  Stack,
  IconButton,
} from '@mui/material';
import { CreateBotDto } from 'trader-client-v1';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Available indicator types
const INDICATOR_TYPES = [
  {
    id: 'sma',
    name: 'Simple Moving Average (SMA)',
    description: 'Calculates the average price over a specified period',
  },
  {
    id: 'ema',
    name: 'Exponential Moving Average (EMA)',
    description:
      'Weighted moving average that places more emphasis on recent prices',
  },
];

interface IndicatorsConfigFormProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

export function IndicatorsConfigForm({
  botDto,
  onChange,
}: IndicatorsConfigFormProps) {
  // Default values for new indicators
  const defaultSMA = {
    type: 'sma' as const,
    options: {
      period: 14,
    },
  };

  const defaultEMA = {
    type: 'ema' as const,
    options: {
      period: 12,
    },
  };

  // Handle adding a new indicator
  const handleAddIndicator = (type: 'sma' | 'ema') => {
    const updatedBot = { ...botDto };

    if (!updatedBot.strategyConfig.indicatorConfigs) {
      updatedBot.strategyConfig.indicatorConfigs = [];
    }

    // Add the appropriate default indicator based on type
    if (type === 'sma') {
      updatedBot.strategyConfig.indicatorConfigs.push({ ...defaultSMA });
    } else {
      updatedBot.strategyConfig.indicatorConfigs.push({ ...defaultEMA });
    }

    onChange(updatedBot);
  };

  // Handle removing an indicator
  const handleRemoveIndicator = (index: number) => {
    const updatedBot = { ...botDto };
    updatedBot.strategyConfig.indicatorConfigs.splice(index, 1);
    onChange(updatedBot);
  };

  // Handle updating an indicator's period
  const handlePeriodChange = (index: number, period: number) => {
    const updatedBot = { ...botDto };
    const indicatorConfig = updatedBot.strategyConfig.indicatorConfigs[index];

    if (indicatorConfig.type === 'sma' || indicatorConfig.type === 'ema') {
      // Type assertion to inform TypeScript that options will have a period
      (indicatorConfig.options as { period: number }).period = period;
    }
    onChange(updatedBot);
  };

  // Get current indicators or empty array if none
  const indicators = botDto.strategyConfig.indicatorConfigs || [];

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
        Indicator Configurations
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Add one or more technical indicators to generate trading signals for
          your bot.
        </Typography>
      </Box>

      {/* List of configured indicators */}
      {indicators.length > 0 ? (
        <Stack spacing={2} sx={{ mb: 3 }}>
          {indicators.map((indicator, index) => (
            <Card key={index} variant="outlined" sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Typography variant="subtitle2">
                  {indicator.type === 'sma'
                    ? 'Simple Moving Average'
                    : 'Exponential Moving Average'}
                </Typography>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveIndicator(index)}
                  aria-label="Remove indicator"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>

              <Box>
                <TextField
                  fullWidth
                  label="Period"
                  type="number"
                  value={
                    indicator.type === 'sma' || indicator.type === 'ema'
                      ? (indicator.options as { period: number }).period
                      : ''
                  }
                  onChange={(e) =>
                    handlePeriodChange(index, Number(e.target.value))
                  }
                  inputProps={{ min: 2, max: 200 }}
                  helperText={
                    indicator.type === 'sma'
                      ? 'Number of periods for the simple average calculation'
                      : indicator.type === 'ema'
                        ? 'Number of periods for the exponential average calculation'
                        : 'Period is not applicable for this indicator type'
                  }
                  size="small"
                />
              </Box>
            </Card>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            p: 3,
            mb: 3,
            bgcolor: 'background.default',
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No indicators configured. Add at least one indicator to generate
            trading signals.
          </Typography>
        </Box>
      )}

      {/* Add indicator section */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Add New Indicator
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {INDICATOR_TYPES.map((type) => (
            <Button
              key={type.id}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleAddIndicator(type.id as 'sma' | 'ema')}
              sx={{ textTransform: 'none' }}
            >
              Add {type.name}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
