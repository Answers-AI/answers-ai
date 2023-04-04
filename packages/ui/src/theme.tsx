'use client';
import { PaletteMode } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import { amber, grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  shape: {
    borderRadius: 4
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
    background: {
      default: '#0b0b0b',
      paper: '#161616'
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
const theme = createTheme({
  ...getDesignTokens('dark')
});

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
    MuiModal: {
      styleOverrides: {
        root: {
          pre: {
            background: 'blue',
            padding: '16px',
            borderRadius: '2px'
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.75)'
        }
      }
    },
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          padding: theme.spacing(0.5, 1)
        }
      }
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'xxl' }
    },
    MuiList: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(1),
          gap: theme.spacing(1)
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          paddingLeft: theme.spacing(0)
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: theme.spacing(0.5, 1)
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {}
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        secondary: {
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
