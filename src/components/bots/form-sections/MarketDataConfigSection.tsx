import { MarketDataConfigForm } from '../MarketDataConfigForm';
import { FormSection } from '../../common/FormSection';
import { CreateBotDto } from 'src/api';

interface MarketDataConfigSectionProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

export function MarketDataConfigSection({
  botDto,
  onChange,
}: MarketDataConfigSectionProps) {
  return (
    <FormSection title="Market Data Configuration" sectionNumber={4}>
      <MarketDataConfigForm botDto={botDto} onChange={onChange} />
    </FormSection>
  );
}
