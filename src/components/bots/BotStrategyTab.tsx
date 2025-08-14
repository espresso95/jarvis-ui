import { useState, useEffect } from 'react';
import {
  BotEntityDto,
  StrategyConfigDto,
  CreateBotDto,
} from 'src/api';
import { formatPercent } from './BotTypes';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  TextField,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandMore, Edit, Code, SaveAlt, Close } from '@mui/icons-material';
import { IndicatorsConfigForm } from './form-sections/IndicatorsConfigForm';
import { RiskConfigForm } from './form-sections/RiskConfigForm';
import { OrderStrategyConfigForm } from './form-sections/OrderStrategyConfigForm';

interface BotStrategyTabProps {
  bot: BotEntityDto;
  onUpdateStrategy?: (
    botId: string,
    strategyConfig: StrategyConfigDto,
  ) => Promise<void>;
}

export function BotStrategyTab({ bot, onUpdateStrategy }: BotStrategyTabProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [editing, setEditing] = useState(false);
  const [jsonConfig, setJsonConfig] = useState('');
  const [editMode, setEditMode] = useState<'form' | 'json'>('form');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [configExpanded, setConfigExpanded] = useState(false);
  const [workingBotDto, setWorkingBotDto] = useState<CreateBotDto | null>(null);

  useEffect(() => {
    if (bot.strategyConfig) {
      setJsonConfig(JSON.stringify(bot.strategyConfig, null, 2));

      // Convert BotEntityDto to CreateBotDto for the form components
      setWorkingBotDto({
        name: bot.name,
        description: bot.description || '',
        strategyConfig: { ...bot.strategyConfig },
        marketData: { marketDataFeedId: bot.marketDataFeedId },
        walletId: bot.walletId,
        marketPairs: bot.marketPairs,
      });
    }
  }, [bot]);

  const handleConfigChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonConfig(e.target.value);
    setError(null);
  };

  const handleFormChange = (updatedBot: CreateBotDto) => {
    setWorkingBotDto(updatedBot);
    setJsonConfig(JSON.stringify(updatedBot.strategyConfig, null, 2));
    setError(null);
  };

  const handleEditModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'form' | 'json' | null,
  ) => {
    if (newMode !== null) {
      setEditMode(newMode);
    }
  };

  const handleUpdateConfig = async () => {
    try {
      let updatedConfig: StrategyConfigDto;

      if (editMode === 'json') {
        updatedConfig = JSON.parse(jsonConfig) as StrategyConfigDto;
      } else {
        // Use the form data
        updatedConfig = workingBotDto!.strategyConfig;
      }

      if (onUpdateStrategy) {
        await onUpdateStrategy(bot.id, updatedConfig);
        setSuccess('Trading strategy updated successfully');
        setEditing(false);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Invalid strategy configuration',
      );
    }
  };

  if (!workingBotDto) {
    return (
      <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
        Loading strategy configuration...
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" component="h2">
          Trading Strategy
        </Typography>

        <Stack direction="row" spacing={1}>
          {editing ? (
            <>
              <ToggleButtonGroup
                value={editMode}
                exclusive
                onChange={handleEditModeChange}
                size="small"
              >
                <ToggleButton value="form">Form</ToggleButton>
                <ToggleButton value="json">JSON</ToggleButton>
              </ToggleButtonGroup>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Close />}
                onClick={() => setEditing(false)}
                size="small"
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveAlt />}
                onClick={handleUpdateConfig}
                size="small"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<Code />}
                onClick={() => setConfigExpanded(!configExpanded)}
                size="small"
              >
                {configExpanded ? 'Hide JSON' : 'View JSON'}
              </Button>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setEditing(true)}
                size="small"
              >
                Edit Strategy
              </Button>
            </>
          )}
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* JSON View - only show when viewing JSON or editing in JSON mode */}
      {(configExpanded && !editing) || (editing && editMode === 'json') ? (
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}
        >
          <Typography variant="subtitle2" gutterBottom>
            JSON Configuration
          </Typography>
          {editing && editMode === 'json' ? (
            <TextField
              multiline
              fullWidth
              rows={isMobile ? 8 : 12}
              value={jsonConfig}
              onChange={handleConfigChange}
              variant="outlined"
              sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
              placeholder="Enter your JSON strategy configuration here"
            />
          ) : (
            <Box
              component="pre"
              sx={{
                overflow: 'auto',
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 1,
                fontSize: '0.875rem',
                maxHeight: '400px',
              }}
            >
              {jsonConfig}
            </Box>
          )}
        </Paper>
      ) : null}

      {/* Form Edit Mode */}
      {editing && editMode === 'form' && (
        <Box sx={{ mb: 3 }}>
          <Accordion
            defaultExpanded={!isMobile}
            sx={{
              mb: 2,
              boxShadow: 'none',
              '&:before': { display: 'none' },
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 1,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" fontWeight="medium">
                Indicator Configuration
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" paragraph>
                Configure the technical indicators that generate trading
                signals. Indicators analyze price movements and market
                conditions to determine entry and exit points.
              </Typography>
              <IndicatorsConfigForm
                botDto={workingBotDto}
                onChange={handleFormChange}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              mb: 2,
              boxShadow: 'none',
              '&:before': { display: 'none' },
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 1,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" fontWeight="medium">
                Risk Configuration
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RiskConfigForm
                botDto={workingBotDto}
                onChange={handleFormChange}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              boxShadow: 'none',
              '&:before': { display: 'none' },
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 1,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" fontWeight="medium">
                Order Strategy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <OrderStrategyConfigForm
                botDto={workingBotDto}
                onChange={handleFormChange}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {/* Display mode - only shown when not editing */}
      {!editing && (
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Indicator Configuration
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
              }}
            >
              {bot.strategyConfig.indicatorConfigs.map((indicator, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Indicator: {indicator.type.toUpperCase()}
                  </Typography>
                  <Box sx={{ pl: 2, mt: 0.5 }}>
                    {Object.entries(indicator.options).map(([key, value]) => (
                      <Typography key={key} variant="body2">
                        {key}: {value}
                      </Typography>
                    ))}
                  </Box>
                  {index < bot.strategyConfig.indicatorConfigs.length - 1 && (
                    <Divider sx={{ my: 1.5 }} />
                  )}
                </Box>
              ))}
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Order Strategy
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
              }}
            >
              {bot.strategyConfig.orderStrategyConfig && (
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Fixed Buy:</strong>{' '}
                    {formatPercent(
                      bot.strategyConfig.orderStrategyConfig.fixedBuyPercentage,
                    )}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Take Profit:</strong>{' '}
                    {formatPercent(
                      bot.strategyConfig.orderStrategyConfig
                        .sellProfitThreshold,
                    )}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Risk Configuration
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
              }}
            >
              {bot.strategyConfig.riskConfigs.map((risk, index) => (
                <Accordion
                  key={index}
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: 'transparent',
                    '&:before': { display: 'none' },
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 1,
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {risk.type.charAt(0).toUpperCase() + risk.type.slice(1)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ pl: 2 }}>
                      {risk.options &&
                        Object.entries(risk.options).map(([key, value]) => (
                          <Typography key={key} variant="body2">
                            <strong>{key}:</strong>{' '}
                            {typeof value === 'number'
                              ? key.toLowerCase().includes('pct')
                                ? formatPercent(value)
                                : value
                              : String(value)}
                          </Typography>
                        ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Box>
        </Stack>
      )}
    </Box>
  );
}
