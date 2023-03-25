import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      'a': { textDecoration: 'none' },
      '*': {
        '::-webkit-scrollbar ': {
          width: '2px'
        },
        '::-webkit-scrollbar-track ': {
          background: 'transparent'
        },
        '::-webkit-scrollbar-thumb ': {
          width: '1px',
          backgroundColor: 'rgba(155, 155, 155, 0.5)',
          borderRadius: '20px,',
          border: 'transparent'
        }
      }
    }}
  />
);
export default GlobalStyles;
