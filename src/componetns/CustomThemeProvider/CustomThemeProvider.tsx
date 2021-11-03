import React, { createContext, useState, useContext } from 'react';
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  PaletteMode,
} from '@mui/material';
import { ThemeProvider as StyledTheme } from 'styled-components';

type Mode = 'light' | 'dark';

const ColorModeToggleContext = createContext(() => {});
export const useToggleColorMode = () => useContext(ColorModeToggleContext);

const CustomThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<Mode>('light');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  if (prefersDarkMode) {
    setMode('dark');
  }

  const toggleColorMode = () => {
    setMode(prev => {
      return prev === 'light' ? 'dark' : 'light';
    });
  };

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeToggleContext.Provider value={toggleColorMode}>
      <ThemeProvider theme={theme}>
        <StyledTheme theme={theme}>{children}</StyledTheme>
      </ThemeProvider>
    </ColorModeToggleContext.Provider>
  );
};

export default CustomThemeProvider;

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#004d40',
            dark: '#006848',
            contrastText: '#f5f5f5',
          },
          secondary: {
            main: '#002419',
          },
          info: {
            main: '#002419',
          },
          background: {
            default: '#F4EEE8',
            paper: '#D4ECDD',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#03506F',
            dark: '#002419',
            contrastText: '#FFE3D8',
          },
          secondary: {
            main: '#002419',
          },
          info: {
            main: '#FFE3D8',
          },
          background: {
            default: '#171717',
            paper: '#FFE3D8',
          },
        }),
  },
});