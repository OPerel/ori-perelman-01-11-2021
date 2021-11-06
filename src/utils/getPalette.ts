import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => {
  const lightPalette = {
    primary: {
      main: '#004d40',
      dark: '#006848',
      contrastText: '#f5f5f5',
    },
    secondary: {
      main: '#006c45',
    },
    info: {
      main: '#002419',
    },
    background: {
      default: '#F4EEE8',
      paper: '#D4ECDD',
    },
  };
  const darkPalette = {
    primary: {
      main: '#253337',
      dark: '#002530',
      contrastText: '#a8aaaa',
    },
    secondary: {
      main: '#a8aaaa',
    },
    info: {
      main: '#a6c9cb',
    },
    background: {
      default: '#002530',
      paper: '#0D2B33',
    },
    error: {
      main: '#d94444',
    },
  };
  return {
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
  };
};

export default getDesignTokens;
