import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      blue: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      green: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      red: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      purple: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      orange: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      indigo: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      gray: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      success: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      error: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      warning: {
        50: string; 100: string; 200: string; 300: string; 400: string;
        500: string; 600: string; 700: string; 800: string; 900: string;
      };
      white: string;
      black: string;
    };
    spacing: {
      [key: string]: string;
    };
    borderRadius: {
      [key: string]: string;
    };
    fontSizes: {
      [key: string]: string;
    };
    fontWeights: {
      [key: string]: number;
    };
    lineHeights: {
      [key: string]: number;
    };
    shadows: {
      [key: string]: string;
    };
    breakpoints: {
      [key: string]: string;
    };
    zIndex: {
      [key: string]: number;
    };
    transitions: {
      [key: string]: string;
    };
    typography: {
      fontSize: {
        [key: string]: string;
      };
      fontWeight: {
        [key: string]: number;
      };
      lineHeight: {
        [key: string]: number;
      };
      fontFamily: {
        sans: string[];
        mono: string[];
      };
    };
  }
}
