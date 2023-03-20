'use client';
import { PaletteMode } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import { amber, grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
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
export const darkModeTheme = createTheme({
  ...getDesignTokens('dark'),
  components: {
    MuiContainer: {
      defaultProps: { maxWidth: 'xxl' }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          'width': '100%',
          'overflow': 'hidden',
          'margin': 0,
          'background': 'none',
          'box-shadow': 'none',
          '.MuiAccordionSummary-root': {
            'min-height': 0,
            '&.Mui-expanded': { 'min-height': 0 },
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
