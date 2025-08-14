import { BasicInfoForm } from '../BasicInfoForm';
import { FormSection } from '../../common/FormSection';
import { CreateBotDto } from 'src/api';

interface BasicInfoSectionProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

export function BasicInfoSection({ botDto, onChange }: BasicInfoSectionProps) {
  return (
    <FormSection title="Basic Information" sectionNumber={1}>
      <BasicInfoForm botDto={botDto} onChange={onChange} />
    </FormSection>
  );
}
