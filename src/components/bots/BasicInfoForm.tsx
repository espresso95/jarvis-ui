import { CreateBotDto } from 'src/api';
import { MARKET_PAIRS } from './BotTypes';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
} from '@mui/material';

interface BasicInfoFormProps {
  botDto: CreateBotDto;
  onChange: (updatedBot: CreateBotDto) => void;
}

export function BasicInfoForm({ botDto, onChange }: BasicInfoFormProps) {
  const handleChange = (field: string, value: string | string[]) => {
    const updatedBot = { ...botDto };

    switch (field) {
      case 'name':
        updatedBot.name = value as string;
        break;
      case 'description':
        updatedBot.description = value as string;
        break;
      case 'marketPairs':
        updatedBot.marketPairs = value as string[];
        break;
      default:
        break;
    }

    onChange(updatedBot);
  };

  return (
    <Box sx={{ mb: 4 }}>
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
        Basic Information
      </Typography>

      <Stack spacing={3}>
        <TextField
          id="botName"
          label="Bot Name"
          variant="outlined"
          fullWidth
          value={botDto.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />

        <TextField
          id="botDescription"
          label="Description"
          variant="outlined"
          fullWidth
          value={botDto.description}
          onChange={(e) => handleChange('description', e.target.value)}
          multiline
          rows={3}
        />

        <FormControl fullWidth>
          <InputLabel id="market-pairs-label">Market Pairs</InputLabel>
          <Select
            labelId="market-pairs-label"
            id="market-pairs"
            multiple
            value={botDto.marketPairs || []}
            label="Market Pairs"
            onChange={(e) =>
              handleChange('marketPairs', e.target.value as string[])
            }
            required
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {MARKET_PAIRS.map((pair) => (
              <MenuItem key={pair} value={pair}>
                {pair}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
