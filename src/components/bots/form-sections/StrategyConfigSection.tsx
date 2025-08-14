import { CreateBotDto } from 'src/api';
import { IndicatorsConfigForm } from './IndicatorsConfigForm';
import { RiskConfigForm } from './RiskConfigForm';
import { OrderStrategyConfigForm } from './OrderStrategyConfigForm';
import { FormSection } from '../../common/FormSection';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface StrategyConfigSectionProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

export function StrategyConfigSection({
  botDto,
  onChange,
}: StrategyConfigSectionProps) {
  return (
    <FormSection title="Strategy Configuration" sectionNumber={2}>
      {/* Section 2.1: Indicator Configuration */}
      <Accordion
        defaultExpanded
        sx={{
          mb: 2,
          boxShadow: 'none',
          '&:before': { display: 'none' },
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="medium">
            2.1 Indicator Configuration
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary" paragraph>
            Configure the technical indicators that generate trading signals.
            Indicators analyze price movements and market conditions to
            determine entry and exit points.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IndicatorsConfigForm botDto={botDto} onChange={onChange} />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Section 2.2: Risk Configuration */}
      <Accordion
        defaultExpanded
        sx={{
          mb: 2,
          boxShadow: 'none',
          '&:before': { display: 'none' },
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="medium">
            2.2 Risk Configuration
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RiskConfigForm botDto={botDto} onChange={onChange} />
        </AccordionDetails>
      </Accordion>

      {/* Section 2.3: Order Strategy Configuration */}
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: 'none',
          '&:before': { display: 'none' },
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 1,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="medium">
            2.3 Order Strategy Configuration
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrderStrategyConfigForm botDto={botDto} onChange={onChange} />
        </AccordionDetails>
      </Accordion>
    </FormSection>
  );
}
