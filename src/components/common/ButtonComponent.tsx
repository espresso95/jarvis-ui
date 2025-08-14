import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

/**
 * Standardized button component that wraps MUI Button with consistent styling
 * for the notos-trader-ui application
 */
export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

/**
 * Button component that wraps MUI Button with consistent styling
 */
export function Button({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  startIcon,
  endIcon,
  ...rest
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || isLoading}
      startIcon={isLoading ? null : startIcon}
      endIcon={isLoading ? null : endIcon}
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        boxShadow: variant === 'contained' ? 1 : 'none',
        ...rest.sx,
      }}
      {...rest}
    >
      {isLoading ? 'Loading...' : children}
    </MuiButton>
  );
}

/**
 * Action button - Primary action (blue)
 */
export function ActionButton({ children, ...props }: ButtonProps) {
  return (
    <Button color="primary" {...props}>
      {children}
    </Button>
  );
}

/**
 * Secondary button - Secondary action (light gray)
 */
export function SecondaryButton({ children, ...props }: ButtonProps) {
  return (
    <Button variant="outlined" color="inherit" {...props}>
      {children}
    </Button>
  );
}

/**
 * Success button - Positive action (green)
 */
export function SuccessButton({ children, ...props }: ButtonProps) {
  return (
    <Button color="success" {...props}>
      {children}
    </Button>
  );
}

/**
 * Warning button - Caution action (yellow/orange)
 */
export function WarningButton({ children, ...props }: ButtonProps) {
  return (
    <Button color="warning" {...props}>
      {children}
    </Button>
  );
}

/**
 * Danger button - Dangerous action (red)
 */
export function DangerButton({ children, ...props }: ButtonProps) {
  return (
    <Button color="error" {...props}>
      {children}
    </Button>
  );
}

/**
 * Link button - Looks like a link
 */
export function LinkButton({ children, ...props }: ButtonProps) {
  return (
    <Button variant="text" {...props}>
      {children}
    </Button>
  );
}
