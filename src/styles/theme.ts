import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    trading: {
      profit: string;
      loss: string;
      neutral: string;
      open: string;
      closed: string;
    };
  }
  interface PaletteOptions {
    trading?: {
      profit?: string;
      loss?: string;
      neutral?: string;
      open?: string;
      closed?: string;
    };
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
    trading: {
      profit: '#16a34a',
      loss: '#dc2626',
      neutral: '#737373',
      open: '#1976d2',
      closed: '#737373',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: { fontSize: '0.75rem' },
      },
      defaultProps: { size: 'small', variant: 'outlined' },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 500, textTransform: 'capitalize' },
        root: { padding: '12px 16px' },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: { '&:last-child td, &:last-child th': { borderBottom: 0 } },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
