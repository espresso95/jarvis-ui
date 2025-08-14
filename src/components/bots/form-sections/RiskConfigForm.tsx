import { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  TextField,
  Chip,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Slider,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface RiskConfigFormProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

type RiskRuleType =
  | 'insufficientCash'
  | 'insufficientHoldings'
  | 'maxTradeSize'
  | 'positionLimit'
  | 'positionSizing';

const RISK_RULE_OPTIONS = [
  {
    value: 'insufficientCash',
    label: 'Insufficient Cash',
    description:
      'Prevents trades when cash balance is insufficient for the order',
  },
  {
    value: 'insufficientHoldings',
    label: 'Insufficient Holdings',
    description: 'Prevents sell orders when token holdings are insufficient',
  },
  {
    value: 'maxTradeSize',
    label: 'Maximum Trade Size',
    description: 'Limits trade size as a percentage of portfolio value',
  },
  {
    value: 'positionLimit',
    label: 'Position Limit',
    description: 'Limits maximum number of concurrent positions',
  },
  {
    value: 'positionSizing',
    label: 'Position Sizing',
    description:
      'Applies position sizing strategy based on risk tolerance and stop loss percentage',
  },
];

/**
 * RiskConfigForm component
 *
 * Allows users to select and configure multiple risk rules
 */
export function RiskConfigForm({ botDto, onChange }: RiskConfigFormProps) {
  const [selectedRule, setSelectedRule] = useState<RiskRuleType | ''>('');

  // Helper to get already configured risk rules
  const getConfiguredRiskRules = (): RiskRuleType[] => {
    return botDto.strategyConfig.riskConfigs.map(
      (rule) => rule.type as RiskRuleType,
    );
  };

  // Helper to generate available risk rules that aren't already configured
  const getAvailableRiskRules = (): RiskRuleType[] => {
    const configured = getConfiguredRiskRules();
    return RISK_RULE_OPTIONS.map(
      (option) => option.value as RiskRuleType,
    ).filter((ruleType) => !configured.includes(ruleType));
  };

  // Helper for finding a specific risk rule in the config
  const findRiskRule = <T extends RiskRuleType>(type: T) => {
    return botDto.strategyConfig.riskConfigs.find((rule) => rule.type === type);
  };

  // Add a new risk rule
  const handleAddRiskRule = () => {
    if (!selectedRule) return;

    const updatedBot = { ...botDto };
    let newRule;

    switch (selectedRule) {
      case 'insufficientCash':
        newRule = {
          type: 'insufficientCash',
          options: {},
        } as InsufficientCashRiskDto;
        break;
      case 'insufficientHoldings':
        newRule = {
          type: 'insufficientHoldings',
          options: {},
        } as InsufficientHoldingsRiskDto;
        break;
      case 'maxTradeSize':
        newRule = {
          type: 'maxTradeSize',
          options: { maxTradeSizePct: 0.05 },
        } as MaxTradeSizeRiskDto;
        break;
      case 'positionLimit':
        newRule = {
          type: 'positionLimit',
          options: { maxPositionCount: 5 },
        } as PositionLimitRiskDto;
        break;
      case 'positionSizing':
        newRule = {
          type: 'positionSizing',
          options: { perTradeRiskPct: 0.02, stopLossPct: 0.03 },
        } as PositionSizingRiskDto;
        break;
    }

    updatedBot.strategyConfig.riskConfigs = [
      ...updatedBot.strategyConfig.riskConfigs,
      newRule,
    ];
    onChange(updatedBot);
    setSelectedRule('');
  };

  // Remove a risk rule
  const handleRemoveRiskRule = (ruleType: RiskRuleType) => {
    const updatedBot = { ...botDto };
    updatedBot.strategyConfig.riskConfigs =
      updatedBot.strategyConfig.riskConfigs.filter(
        (rule) => rule.type !== ruleType,
      );
    onChange(updatedBot);
  };

  // Update maxTradeSize risk rule
  const handleMaxTradeSizeChange = (value: number) => {
    const updatedBot = { ...botDto };
    const ruleIndex = updatedBot.strategyConfig.riskConfigs.findIndex(
      (r) => r.type === 'maxTradeSize',
    );

    if (ruleIndex !== -1) {
      const ruleConfig = updatedBot.strategyConfig.riskConfigs[
        ruleIndex
      ] as MaxTradeSizeRiskDto;
      if (ruleConfig && ruleConfig.options) {
        ruleConfig.options.maxTradeSizePct = value / 100;
      }
    }

    onChange(updatedBot);
  };

  // Update positionLimit risk rule
  const handlePositionLimitChange = (value: number) => {
    const updatedBot = { ...botDto };
    const ruleIndex = updatedBot.strategyConfig.riskConfigs.findIndex(
      (r) => r.type === 'positionLimit',
    );

    if (ruleIndex !== -1) {
      const ruleConfig = updatedBot.strategyConfig.riskConfigs[
        ruleIndex
      ] as PositionLimitRiskDto;
      if (ruleConfig && ruleConfig.options) {
        ruleConfig.options.maxPositionCount = value;
      }
    }

    onChange(updatedBot);
  };

  // Update positionSizing risk rule
  const handlePerTradeRiskChange = (value: number) => {
    const updatedBot = { ...botDto };
    const ruleIndex = updatedBot.strategyConfig.riskConfigs.findIndex(
      (r) => r.type === 'positionSizing',
    );

    if (ruleIndex !== -1) {
      const ruleConfig = updatedBot.strategyConfig.riskConfigs[
        ruleIndex
      ] as PositionSizingRiskDto;
      if (ruleConfig && ruleConfig.options) {
        ruleConfig.options.perTradeRiskPct = value / 100;
      }
    }

    onChange(updatedBot);
  };

  const handleStopLossChange = (value: number) => {
    const updatedBot = { ...botDto };
    const ruleIndex = updatedBot.strategyConfig.riskConfigs.findIndex(
      (r) => r.type === 'positionSizing',
    );

    if (ruleIndex !== -1) {
      const ruleConfig = updatedBot.strategyConfig.riskConfigs[
        ruleIndex
      ] as PositionSizingRiskDto;
      if (ruleConfig && ruleConfig.options) {
        ruleConfig.options.stopLossPct = value / 100;
      }
    }

    onChange(updatedBot);
  };

  // Helper to get values from existing rules
  const getMaxTradeSizePct = (): number => {
    const rule = findRiskRule('maxTradeSize') as
      | MaxTradeSizeRiskDto
      | undefined;
    return (rule?.options?.maxTradeSizePct || 0.05) * 100;
  };

  const getMaxPositionCount = (): number => {
    const rule = findRiskRule('positionLimit') as
      | PositionLimitRiskDto
      | undefined;
    return rule?.options?.maxPositionCount || 5;
  };

  const getPerTradeRiskPct = (): number => {
    const rule = findRiskRule('positionSizing') as
      | PositionSizingRiskDto
      | undefined;
    return (rule?.options?.perTradeRiskPct || 0.02) * 100;
  };

  const getStopLossPct = (): number => {
    const rule = findRiskRule('positionSizing') as
      | PositionSizingRiskDto
      | undefined;
    return (rule?.options?.stopLossPct || 0.03) * 100;
  };

  const configuredRules = getConfiguredRiskRules();
  const availableRules = getAvailableRiskRules();

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" paragraph>
        Configure risk management rules to protect your capital and manage
        trading decisions.
      </Typography>

      {/* Add new risk rule */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="add-risk-rule-label">Add Risk Rule</InputLabel>
          <Select
            labelId="add-risk-rule-label"
            value={selectedRule}
            label="Add Risk Rule"
            onChange={(e) => setSelectedRule(e.target.value as RiskRuleType)}
            disabled={availableRules.length === 0}
          >
            {availableRules.map((ruleType) => {
              const option = RISK_RULE_OPTIONS.find(
                (opt) => opt.value === ruleType,
              );
              return (
                <MenuItem key={ruleType} value={ruleType}>
                  {option?.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRiskRule}
          disabled={!selectedRule || availableRules.length === 0}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>

      {/* Display configured risk rules */}
      <Stack spacing={3} sx={{ mt: 3 }}>
        {configuredRules.length === 0 && (
          <Typography color="text.secondary" align="center">
            No risk rules configured. Add rules above to define your risk
            management strategy.
          </Typography>
        )}

        {configuredRules.includes('insufficientCash') && (
          <Card variant="outlined">
            <CardHeader
              title="Insufficient Cash Check"
              titleTypographyProps={{ variant: 'subtitle1' }}
              action={
                <IconButton
                  aria-label="remove"
                  size="small"
                  onClick={() => handleRemoveRiskRule('insufficientCash')}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This rule prevents buy orders when there is insufficient cash in
                the wallet. No additional configuration required.
              </Typography>
            </CardContent>
          </Card>
        )}

        {configuredRules.includes('insufficientHoldings') && (
          <Card variant="outlined">
            <CardHeader
              title="Insufficient Holdings Check"
              titleTypographyProps={{ variant: 'subtitle1' }}
              action={
                <IconButton
                  aria-label="remove"
                  size="small"
                  onClick={() => handleRemoveRiskRule('insufficientHoldings')}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This rule prevents sell orders when there are insufficient token
                holdings. No additional configuration required.
              </Typography>
            </CardContent>
          </Card>
        )}

        {configuredRules.includes('maxTradeSize') && (
          <Card variant="outlined">
            <CardHeader
              title="Maximum Trade Size"
              titleTypographyProps={{ variant: 'subtitle1' }}
              action={
                <IconButton
                  aria-label="remove"
                  size="small"
                  onClick={() => handleRemoveRiskRule('maxTradeSize')}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Limits individual trade size to a percentage of total portfolio
                value.
              </Typography>
              <Box sx={{ mt: 2 }}>
                {' '}
                <Grid container spacing={2} alignItems="center">
                  <Grid
                    component="div"
                    sx={{ gridColumn: { xs: 'span 12', sm: 'span 10' } }}
                  >
                    <Typography id="max-trade-size-slider" gutterBottom>
                      Maximum Trade Size: {getMaxTradeSizePct()}%
                    </Typography>
                    <Slider
                      aria-labelledby="max-trade-size-slider"
                      value={getMaxTradeSizePct()}
                      onChange={(_, value) =>
                        handleMaxTradeSizeChange(value as number)
                      }
                      step={1}
                      min={1}
                      max={50}
                      marks={[
                        { value: 5, label: '5%' },
                        { value: 25, label: '25%' },
                        { value: 50, label: '50%' },
                      ]}
                    />
                  </Grid>
                  <Grid
                    component="div"
                    sx={{ gridColumn: { xs: 'span 12', sm: 'span 2' } }}
                  >
                    <TextField
                      value={getMaxTradeSizePct()}
                      onChange={(e) =>
                        handleMaxTradeSizeChange(Number(e.target.value))
                      }
                      inputProps={{
                        step: 1,
                        min: 1,
                        max: 50,
                        type: 'number',
                      }}
                      sx={{ width: '80px' }}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Typography variant="caption" color="text.secondary">
                  Lower values reduce risk exposure for single trades. Higher
                  values allow larger individual positions.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}

        {configuredRules.includes('positionLimit') && (
          <Card variant="outlined">
            <CardHeader
              title="Position Limit"
              titleTypographyProps={{ variant: 'subtitle1' }}
              action={
                <IconButton
                  aria-label="remove"
                  size="small"
                  onClick={() => handleRemoveRiskRule('positionLimit')}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Limits the maximum number of concurrent positions your portfolio
                can hold.
              </Typography>
              <Box sx={{ mt: 2 }}>
                {' '}
                <Grid container spacing={2} alignItems="center">
                  <Grid
                    component="div"
                    sx={{ gridColumn: { xs: 'span 12', sm: 'span 10' } }}
                  >
                    <Typography id="max-positions-slider" gutterBottom>
                      Maximum Positions: {getMaxPositionCount()}
                    </Typography>
                    <Slider
                      aria-labelledby="max-positions-slider"
                      value={getMaxPositionCount()}
                      onChange={(_, value) =>
                        handlePositionLimitChange(value as number)
                      }
                      step={1}
                      min={1}
                      max={20}
                      marks={[
                        { value: 1, label: '1' },
                        { value: 10, label: '10' },
                        { value: 20, label: '20' },
                      ]}
                    />
                  </Grid>
                  <Grid
                    component="div"
                    sx={{ gridColumn: { xs: 'span 12', sm: 'span 2' } }}
                  >
                    <TextField
                      value={getMaxPositionCount()}
                      onChange={(e) =>
                        handlePositionLimitChange(Number(e.target.value))
                      }
                      inputProps={{
                        step: 1,
                        min: 1,
                        max: 20,
                        type: 'number',
                      }}
                      sx={{ width: '80px' }}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Typography variant="caption" color="text.secondary">
                  Lower limits focus capital on fewer positions. Higher limits
                  increase diversification.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}

        {configuredRules.includes('positionSizing') && (
          <Card variant="outlined">
            <CardHeader
              title="Position Sizing"
              titleTypographyProps={{ variant: 'subtitle1' }}
              action={
                <IconButton
                  aria-label="remove"
                  size="small"
                  onClick={() => handleRemoveRiskRule('positionSizing')}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Advanced position sizing based on risk tolerance and stop loss
                levels.
              </Typography>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid
                      component="div"
                      sx={{ gridColumn: { xs: 'span 12', sm: 'span 10' } }}
                    >
                      <Typography id="per-trade-risk-slider" gutterBottom>
                        Risk Per Trade: {getPerTradeRiskPct()}%
                      </Typography>
                      <Slider
                        aria-labelledby="per-trade-risk-slider"
                        value={getPerTradeRiskPct()}
                        onChange={(_, value) =>
                          handlePerTradeRiskChange(value as number)
                        }
                        step={0.5}
                        min={0.5}
                        max={10}
                        marks={[
                          { value: 1, label: '1%' },
                          { value: 5, label: '5%' },
                          { value: 10, label: '10%' },
                        ]}
                      />
                    </Grid>
                    <Grid
                      component="div"
                      sx={{ gridColumn: { xs: 'span 12', sm: 'span 2' } }}
                    >
                      <TextField
                        value={getPerTradeRiskPct()}
                        onChange={(e) =>
                          handlePerTradeRiskChange(Number(e.target.value))
                        }
                        inputProps={{
                          step: 0.5,
                          min: 0.5,
                          max: 10,
                          type: 'number',
                        }}
                        sx={{ width: '80px' }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="caption" color="text.secondary">
                    Maximum percentage of portfolio to risk on a single trade
                  </Typography>
                </Box>

                <Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid
                      component="div"
                      sx={{ gridColumn: { xs: 'span 12', sm: 'span 10' } }}
                    >
                      <Typography id="stop-loss-slider" gutterBottom>
                        Stop Loss: {getStopLossPct()}%
                      </Typography>
                      <Slider
                        aria-labelledby="stop-loss-slider"
                        value={getStopLossPct()}
                        onChange={(_, value) =>
                          handleStopLossChange(value as number)
                        }
                        step={0.5}
                        min={0.5}
                        max={20}
                        marks={[
                          { value: 2, label: '2%' },
                          { value: 10, label: '10%' },
                          { value: 20, label: '20%' },
                        ]}
                      />
                    </Grid>
                    <Grid
                      component="div"
                      sx={{ gridColumn: { xs: 'span 12', sm: 'span 2' } }}
                    >
                      <TextField
                        value={getStopLossPct()}
                        onChange={(e) =>
                          handleStopLossChange(Number(e.target.value))
                        }
                        inputProps={{
                          step: 0.5,
                          min: 0.5,
                          max: 20,
                          type: 'number',
                        }}
                        sx={{ width: '80px' }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="caption" color="text.secondary">
                    Percentage below entry price where position is closed to
                    limit losses
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>

      {/* Risk rule summary */}
      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {configuredRules.map((rule) => {
            const option = RISK_RULE_OPTIONS.find((opt) => opt.value === rule);
            return (
              <Chip
                key={rule}
                label={option?.label}
                size="small"
                color="primary"
                variant="outlined"
              />
            );
          })}
          {configuredRules.length === 0 && (
            <Typography color="text.secondary" variant="body2">
              No risk rules selected
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
