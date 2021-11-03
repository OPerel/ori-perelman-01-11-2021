import React from 'react';
import { HeaderTexts, Routes } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useToggleColorMode } from '../CustomThemeProvider/CustomThemeProvider';
import Tooltip from '@mui/material/Tooltip';
import { StyledLink, StyledModeIcon, StyledHeader } from './StyleComponents';

const Header: React.FC = () => {
  const { Title, HomeLink, FavLink, ToggleDarkMode } = HeaderTexts;
  const toggleColorMode = useToggleColorMode();

  return (
    <StyledHeader>
      <Typography variant="h4" component="h1" color="primary.contrastText">
        {Title}
      </Typography>
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
    </StyledHeader>
  );
};

export default Header;
