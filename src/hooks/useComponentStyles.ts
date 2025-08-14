import { useTheme } from '@mui/material/styles';

/**
 * Custom hook for component styling
 *
 * This hook provides consistent styling patterns for components across the application.
 * It leverages the theme from MUI and returns style objects that can be used with the sx prop.
 *
 * @returns An object containing style objects for common component patterns
 */
export function useComponentStyles() {
  const theme = useTheme();

  return {
    container: {
      borderRadius: 2,
      p: 2,
      width: '100%',
    },
    card: {
      borderRadius: 2,
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      mb: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    section: {
      mb: 3,
    },
    formGroup: {
      mb: 2,
    },
    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    statusIndicator: (
      status: 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'neutral',
    ) => {
      const colors = {
        success: theme.palette.success.main,
        warning: theme.palette.warning.main,
        error: theme.palette.error.main,
        info: theme.palette.info.main,
        neutral: theme.palette.text.secondary,
      };

      return {
        color: colors[status],
        display: 'flex',
        alignItems: 'center',
        '& svg': {
          mr: 0.5,
          fontSize: 'small',
        },
      };
    },
  };
}
