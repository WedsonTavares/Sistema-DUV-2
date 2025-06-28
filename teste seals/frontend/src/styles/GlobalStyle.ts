import { createGlobalStyle } from 'styled-components';

// Define theme inline to avoid module issues
const theme = {
  colors: {
    primary: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
      500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827',
    },
    white: '#ffffff',
    black: '#000000',
  },
  borderRadius: {
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease-in-out',
  },
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      mono: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
    },
    lineHeight: {
      normal: 1.5,
    },
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.sans.join(', ')};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[900]};
    line-height: ${theme.typography.lineHeight.normal};
  }

  code {
    font-family: ${theme.typography.fontFamily.mono.join(', ')};
  }

  /* Scrollbar customization */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray[400]};
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Remove default button and input styles */
  button, input, select, textarea {
    font-family: inherit;
  }

  /* Link styles */
  a {
    color: ${theme.colors.primary[600]};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
  }

  a:hover {
    color: ${theme.colors.primary[700]};
  }

  /* Utility classes for animations */
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
  }

  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Keyframes */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }

  /* Responsive utilities */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Print styles */
  @media print {
    * {
      color-adjust: exact;
    }
  }
`;
