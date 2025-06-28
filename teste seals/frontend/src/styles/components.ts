import styled, { css } from 'styled-components';

// Define theme inline to avoid module issues
const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
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
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    white: '#ffffff',
    black: '#000000',
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      mono: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
    },
  },
};

// Container
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

// Grid
export const Grid = styled.div<{ columns?: number; gap?: keyof typeof theme.spacing }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: ${props => theme.spacing[props.gap || 'md']};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(${props => Math.min(2, props.columns || 1)}, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(${props => Math.min(3, props.columns || 1)}, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  }
`;

// Flex
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: keyof typeof theme.spacing;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => theme.spacing[props.gap || 'md']};
  ${props => props.wrap && css`flex-wrap: wrap;`}
`;

// Card
export const Card = styled.div<{ 
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: keyof typeof theme.spacing;
  hoverable?: boolean;
}>`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${props => theme.spacing[props.padding || 'lg']};
  transition: all ${theme.transitions.normal};
  
  ${props => {
    switch (props.variant) {
      case 'outlined':
        return css`
          border: 1px solid ${theme.colors.gray[200]};
        `;
      case 'elevated':
        return css`
          box-shadow: ${theme.shadows.md};
        `;
      default:
        return css`
          border: 1px solid ${theme.colors.gray[100]};
          box-shadow: ${theme.shadows.sm};
        `;
    }
  }}
  
  ${props => props.hoverable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;

// Button
export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  text-decoration: none;
  outline: none;
  
  ${props => props.fullWidth && css`width: 100%;`}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
        `;
      default:
        return css`
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.base};
        `;
    }
  }}
  
  ${props => {
    if (props.disabled) {
      return css`
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      `;
    }
    
    switch (props.variant) {
      case 'secondary':
        return css`
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[700]};
          
          &:hover {
            background: ${theme.colors.gray[200]};
          }
          
          &:active {
            background: ${theme.colors.gray[300]};
          }
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${theme.colors.primary[600]};
          border: 1px solid ${theme.colors.primary[600]};
          
          &:hover {
            background: ${theme.colors.primary[50]};
          }
          
          &:active {
            background: ${theme.colors.primary[100]};
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.gray[600]};
          
          &:hover {
            background: ${theme.colors.gray[100]};
          }
          
          &:active {
            background: ${theme.colors.gray[200]};
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary[600]};
          color: ${theme.colors.white};
          
          &:hover {
            background: ${theme.colors.primary[700]};
          }
          
          &:active {
            background: ${theme.colors.primary[800]};
          }
        `;
    }
  }}
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

// Typography
export const Heading = styled.h1<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;
  align?: 'left' | 'center' | 'right';
}>`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.tight};
  color: ${props => props.color || theme.colors.gray[900]};
  text-align: ${props => props.align || 'left'};
  margin: 0;
  
  ${props => {
    switch (props.level) {
      case 2:
        return css`font-size: ${theme.typography.fontSize['3xl']};`;
      case 3:
        return css`font-size: ${theme.typography.fontSize['2xl']};`;
      case 4:
        return css`font-size: ${theme.typography.fontSize.xl};`;
      case 5:
        return css`font-size: ${theme.typography.fontSize.lg};`;
      case 6:
        return css`font-size: ${theme.typography.fontSize.base};`;
      default:
        return css`font-size: ${theme.typography.fontSize['4xl']};`;
    }
  }}
`;

export const Text = styled.p<{
  size?: keyof typeof theme.typography.fontSize;
  weight?: keyof typeof theme.typography.fontWeight;
  color?: string;
  align?: 'left' | 'center' | 'right';
}>`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${props => theme.typography.fontSize[props.size || 'base']};
  font-weight: ${props => theme.typography.fontWeight[props.weight || 'normal']};
  line-height: ${theme.typography.lineHeight.normal};
  color: ${props => props.color || theme.colors.gray[700]};
  text-align: ${props => props.align || 'left'};
  margin: 0;
`;

// Badge
export const Badge = styled.span<{
  variant?: 'default' | 'success' | 'error' | 'warning';
}>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.medium};
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return css`
          background: ${theme.colors.success[100]};
          color: ${theme.colors.success[800]};
        `;
      case 'error':
        return css`
          background: ${theme.colors.error[100]};
          color: ${theme.colors.error[800]};
        `;
      case 'warning':
        return css`
          background: ${theme.colors.warning[100]};
          color: ${theme.colors.warning[800]};
        `;
      default:
        return css`
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[800]};
        `;
    }
  }}
`;

// Loading Spinner
export const Spinner = styled.div<{ size?: 'sm' | 'md' | 'lg' }>`
  border: 2px solid ${theme.colors.gray[200]};
  border-top: 2px solid ${theme.colors.primary[600]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          width: 16px;
          height: 16px;
        `;
      case 'lg':
        return css`
          width: 32px;
          height: 32px;
        `;
      default:
        return css`
          width: 24px;
          height: 24px;
        `;
    }
  }}
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Input
export const Input = styled.input<{
  variant?: 'default' | 'error';
  fullWidth?: boolean;
}>`
  display: block;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  padding: ${theme.spacing.md};
  border: 1px solid ${props => props.variant === 'error' ? theme.colors.error[500] : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.base};
  background: ${theme.colors.white};
  transition: all ${theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.variant === 'error' ? theme.colors.error[500] : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.variant === 'error' ? theme.colors.error[100] : theme.colors.primary[100]};
  }
  
  &:disabled {
    background: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[500]};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

// Select
export const Select = styled.select<{
  variant?: 'default' | 'error';
  fullWidth?: boolean;
}>`
  display: block;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  padding: ${theme.spacing.md};
  border: 1px solid ${props => props.variant === 'error' ? theme.colors.error[500] : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.base};
  background: ${theme.colors.white};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.variant === 'error' ? theme.colors.error[500] : theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.variant === 'error' ? theme.colors.error[100] : theme.colors.primary[100]};
  }
  
  &:disabled {
    background: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[500]};
    cursor: not-allowed;
  }
`;

// Form Group
export const FormGroup = styled.div<{ gap?: keyof typeof theme.spacing }>`
  display: flex;
  flex-direction: column;
  gap: ${props => theme.spacing[props.gap || 'sm']};
`;

// Label
export const Label = styled.label<{
  required?: boolean;
}>`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[700]};
  
  ${props => props.required && css`
    &::after {
      content: ' *';
      color: ${theme.colors.error[500]};
    }
  `}
`;
