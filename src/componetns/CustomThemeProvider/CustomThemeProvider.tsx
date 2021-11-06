import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  PaletteMode,
} from '@mui/material';
import { ThemeProvider as StyledTheme } from 'styled-components';
import getDesignTokens from '../../utils/getPalette';

const ColorModeToggleContext = createContext(() => {});
export const useToggleColorMode = () => useContext(ColorModeToggleContext);

const CustomThemeProvider: React.FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const initialState = prefersDarkMode ? 'dark' : 'light';
  const [mode, setMode] = useState<PaletteMode>(initialState);

  useEffect(() => {
    if (prefersDarkMode) {
      setMode('dark');
    }
  }, [setMode, prefersDarkMode]);

  const toggleColorMode = () => {
    setMode(prev => {
      return prev === 'light' ? 'dark' : 'light';
    });
  };

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode, prefersDarkMode]
  );

  return (
    <ColorModeToggleContext.Provider value={toggleColorMode}>
      <ThemeProvider theme={theme}>
        <StyledTheme theme={theme}>{children}</StyledTheme>
      </ThemeProvider>
    </ColorModeToggleContext.Provider>
  );
};

export default CustomThemeProvider;
