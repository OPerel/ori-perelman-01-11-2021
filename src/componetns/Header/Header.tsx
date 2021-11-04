import React from 'react';
import { HeaderTexts, Routes } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useToggleColorMode } from '../CustomThemeProvider/CustomThemeProvider';
import Tooltip from '@mui/material/Tooltip';
import { StyledLink, StyledModeIcon, StyledHeader } from './StyleComponents';
import { useMediaQuery, useTheme } from '@mui/material';
import MobileNav from './MobileNav';

const Header: React.FC = () => {
  const theme = useTheme();
  const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));
  const toggleColorMode = useToggleColorMode();
  const { Title, HomeLink, FavLink, ToggleDarkMode } = HeaderTexts;

  return (
    <StyledHeader>
      <Typography
        variant={mdAndDown ? 'h5' : 'h4'}
        component="h1"
        color="primary.contrastText"
      >
        {Title}
      </Typography>
      {mdAndDown ? (
        <MobileNav />
      ) : (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <StyledLink to={Routes.Home} exact activeClassName="activeRoute">
            {HomeLink}
          </StyledLink>
          <StyledLink to={Routes.Favorites} activeClassName="activeRoute">
            {FavLink}
          </StyledLink>
          <Tooltip title={ToggleDarkMode}>
            <StyledModeIcon fontSize="large" onClick={toggleColorMode} />
          </Tooltip>
        </Stack>
      )}
    </StyledHeader>
  );
};

export default Header;
