export const colors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#f50057',
    light: '#ff4081',
    dark: '#c51162',
    contrastText: '#ffffff',
  },

  background: {
    default: '#000000',
    paper: '#000000',
    dark: '#000000',
  },
  text: {
    primary: '#171717',
    secondary: '#6b7280',
    disabled: '#9e9e9e',
    hint: '#9e9e9e',
  },

  success: {
    main: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    contrastText: '#ffffff',
  },
  error: {
    main: '#dc2626',
    light: '#ef4444',
    dark: '#b91c1c',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    contrastText: '#ffffff',
  },
  info: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
    contrastText: '#ffffff',
  },

  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const typography = {
  fontFamily: 'var(--font-sans, "Roboto", "Helvetica", "Arial", sans-serif)',
  fontFamilyMono: 'var(--font-mono, "Courier New", monospace)',

  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '0.5em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    marginBottom: '0.5em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
    marginBottom: '0.5em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
    marginBottom: '0.5em',
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
    marginBottom: '0.5em',
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
    marginBottom: '0.5em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

export const borderRadius = {
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  xxl: '16px',
  round: '50%',
};

export const componentStyles = {
  card: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    padding: spacing.md,
  },
  paper: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    boxShadow: shadows.md,
    padding: spacing.md,
  },
  button: {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.primary.contrastText,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: borderRadius.md,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'background-color 0.2s ease',
      hoverBg: colors.primary.dark,
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      color: colors.secondary.contrastText,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: borderRadius.md,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'background-color 0.2s ease',
      hoverBg: colors.secondary.dark,
    },
    outlined: {
      backgroundColor: 'transparent',
      color: colors.primary.main,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.primary.main}`,
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'all 0.2s ease',
      hoverBg: colors.gray[50],
    },
    text: {
      backgroundColor: 'transparent',
      color: colors.primary.main,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: borderRadius.md,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'background-color 0.2s ease',
      hoverBg: colors.gray[100],
    },
  },
  input: {
    backgroundColor: 'white',
    border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    width: '100%',
  },
  table: {
    container: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      overflow: 'auto',
    },
    headerCell: {
      padding: spacing.md,
      textAlign: 'left',
      borderBottom: `1px solid ${colors.gray[200]}`,
      color: colors.text.secondary,
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    headerCellRight: {
      padding: spacing.md,
      textAlign: 'right',
      borderBottom: `1px solid ${colors.gray[200]}`,
      color: colors.text.secondary,
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    row: {
      borderBottom: `1px solid ${colors.gray[200]}`,
      transition: 'background-color 0.2s ease',
      hoverBg: colors.gray[50],
    },
    cell: {
      padding: spacing.md,
      borderBottom: `1px solid ${colors.gray[200]}`,
      whiteSpace: 'nowrap',
    },
    cellRight: {
      padding: spacing.md,
      borderBottom: `1px solid ${colors.gray[200]}`,
      textAlign: 'right',
      whiteSpace: 'nowrap',
    },
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    display: 'grid',
    gap: spacing.md,
  },
};

export const media = {
  xs: '@media (min-width: 0px)',
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1280px)',
  xxl: '@media (min-width: 1536px)',
};

export const layout = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
};

export const animation = {
  transition: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
};

export const messageStyles = {
  error: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  success: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  warning: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  info: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
};

export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  componentStyles,
  media,
  layout,
  animation,
  messageStyles,
};
