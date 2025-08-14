import { CreateBotDto } from 'src/api';
import { WalletConfigForm } from '../WalletConfigForm';
import { FormSection } from '../../common/FormSection';

interface WalletConfigSectionProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

export function WalletConfigSection({
  botDto,
  onChange,
}: WalletConfigSectionProps) {
  return (
    <FormSection title="Wallet Configuration" sectionNumber={3}>
      <WalletConfigForm botDto={botDto} onChange={onChange} />
    </FormSection>
  );
}
