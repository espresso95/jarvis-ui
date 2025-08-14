import { Card } from '@/components/ui/Card';
import { Stack } from '@mui/material';
import {
  Button,
  ActionButton,
  SecondaryButton,
} from '../common/ButtonComponent';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export function QuickActions() {
  return (
    <Card title="Quick Actions">
      <Stack spacing={2}>
        <ActionButton fullWidth startIcon={<AccountBalanceWalletIcon />}>
          Add to Portfolio
        </ActionButton>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
        >
          Create Trading Bot
        </Button>
        <SecondaryButton fullWidth startIcon={<NotificationsIcon />}>
          Set Price Alert
        </SecondaryButton>
      </Stack>
    </Card>
  );
}
