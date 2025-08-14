import { ReactNode } from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface FormSectionProps {
  title: string;
  sectionNumber: number;
  children: ReactNode;
}

/**
 * FormSection component
 *
 * A reusable component for form sections throughout the application,
 * supporting numbered section titles.
 *
 * @example
 * ```tsx
 * <FormSection
 *   title="Basic Information"
 *   sectionNumber={1}
 * >
 *   <TextField label="Name" fullWidth />
 * </FormSection>
 * ```
 */
export function FormSection({
  title,
  sectionNumber,
  children,
}: FormSectionProps) {
  return (
    <Box mb={4}>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          mb: 2,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: `'"${sectionNumber}"'`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: '0.875rem',
          },
        }}
      >
        {title}
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        {children}
      </Paper>
    </Box>
  );
}
