// MUI version of BotCreateView
import React, { useState } from 'react';
import { CreateBotDto } from 'src/api';
import { BasicInfoSection } from './form-sections/BasicInfoSection';
import { WalletConfigSection } from './form-sections/WalletConfigSection';
import { MarketDataConfigSection } from './form-sections/MarketDataConfigSection';
import { IndicatorsConfigForm } from './form-sections/IndicatorsConfigForm';
import { RiskConfigForm } from './form-sections/RiskConfigForm';
import { OrderStrategyConfigForm } from './form-sections/OrderStrategyConfigForm';
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormSection } from '../common/FormSection';

interface BotCreateViewProps {
  botDto: CreateBotDto;
  isLoading: boolean;
  onBack: () => void;
  onChange: (updatedBot: CreateBotDto) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const steps = [
  'Basic Information',
  'Indicator Configuration',
  'Risk Configuration',
  'Order Strategy',
  'Wallet Configuration',
  'Market Data Configuration',
];

export function BotCreateView({
  botDto,
  isLoading,
  onBack,
  onChange,
  onSubmit,
}: BotCreateViewProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInfoSection botDto={botDto} onChange={onChange} />;
      case 1:
        return (
          <FormSection title={steps[step]} sectionNumber={step + 1}>
            <IndicatorsConfigForm botDto={botDto} onChange={onChange} />
          </FormSection>
        );
      case 2:
        return (
          <FormSection title={steps[step]} sectionNumber={step + 1}>
            <RiskConfigForm botDto={botDto} onChange={onChange} />
          </FormSection>
        );
      case 3:
        return (
          <FormSection title={steps[step]} sectionNumber={step + 1}>
            <OrderStrategyConfigForm botDto={botDto} onChange={onChange} />
          </FormSection>
        );
      case 4:
        return <WalletConfigSection botDto={botDto} onChange={onChange} />;
      case 5:
        return <MarketDataConfigSection botDto={botDto} onChange={onChange} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box mb={3}>
        <Button
          onClick={onBack}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: 'primary.main',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          Back to Bot List
        </Button>
      </Box>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1, // Allow Paper to grow and fill available space
          overflow: 'hidden', // Needed for proper layout of scrolling children
          // height: '700px', // Removed fixed height
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Create New Trading Bot
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 3 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Form should take up remaining vertical space */}
        <form
          id="botCreateForm"
          onSubmit={handleFormSubmit}
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Content Box should scroll within the form's allocated space */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              pr: 1 /* Padding for scrollbar */,
            }}
          >
            {getStepContent(activeStep)}
          </Box>
        </form>

        <Box // Footer Box - now fixed to viewport
          sx={{
            position: 'fixed', // Changed from "absolute"
            bottom: 0,
            left: 0,
            right: 0,
            p: 3,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            zIndex: 1000, // Ensure it's above other content
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              type="button"
              onClick={onBack}
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'grey.300',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Cancel
            </Button>
            {activeStep > 0 && (
              <Button
                type="button"
                onClick={handleBackStep}
                variant="outlined"
                color="inherit"
                sx={{
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Back
              </Button>
            )}
            <Button
              type={activeStep === steps.length - 1 ? 'submit' : 'button'}
              form={
                activeStep === steps.length - 1 ? 'botCreateForm' : undefined
              }
              onClick={activeStep === steps.length - 1 ? undefined : handleNext}
              disabled={isLoading}
              variant="contained"
              color="primary"
            >
              {activeStep === steps.length - 1
                ? isLoading
                  ? 'Creating...'
                  : 'Create Bot'
                : 'Next'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
