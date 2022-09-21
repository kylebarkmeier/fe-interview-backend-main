declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module '@mui/material/styles' {
  import { Property } from 'csstype';
  import FontFamily = Property.FontFamily;

  interface Theme {
    components: {
      MuiButton: {
        defaultProps: {
          variant: string;
        };
        styleOverrides: {
          root: {
            textTransform: string;
          };
        };
      };
      MuiTypography: {
        styleOverrides: {
          root: {
            lineHeight: string | number;
          };
        };
      };
    };
    typography: {
      fontFamily: FontFamily;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    components: {
      MuiButton: {
        defaultProps: {
          variant: string;
        };
        styleOverrides: {
          root: {
            textTransform: string;
          };
        };
      };
      MuiTypography: {
        styleOverrides: {
          root: {
            lineHeight: string | number;
          };
        };
      };
    };
    typography: {
      fontFamily: FontFamily;
    };
  }
}
