'use client';
import { PaletteMode } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import { amber, grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  shape: {
    borderRadius: 2
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920
    }
  },
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300]
      })
    },
    // ...(mode === 'dark' && {
    //   background: {
    //     default: deepOrange[900],
    //     paper: deepOrange[900]
    //   }
    // }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800]
          }
        : {
            primary: '#fff',
            secondary: grey[500]
          })
    }
  }
});
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }
}
export const darkModeTheme = createTheme({
  ...getDesignTokens('dark'),
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          pre: {
            background: 'black',
            padding: '16px',
            borderRadius: '2px'
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {}
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'xxl' }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          'width': '100%',
          'overflow': 'hidden',
          'margin': 0,
          'background': 'none',
          'boxShadow': 'none',
          '.MuiAccordionSummary-root': {
            'minHeight': 0,
            '&.Mui-expanded': { minHeight: 1 },
            'gap': 2
          },
          '&.Mui-expanded': { margin: 0 },
          '.MuiAccordionSummary-content': {
            'margin': 0,
            '&.Mui-expanded': { margin: 0 }
          },
          '.MuiAccordionDetails-root': { padding: 0 }
        }
      }
    }
  }
});
