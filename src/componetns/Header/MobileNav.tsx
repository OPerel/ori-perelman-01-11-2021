import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { MobileLink, StyledModeIcon } from './StyleComponents';
import { HeaderTexts, Routes } from '../../utils/constants';
import Tooltip from '@mui/material/Tooltip';
import { useToggleColorMode } from '../CustomThemeProvider/CustomThemeProvider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

interface Props {}

const MobileNav: React.FC<Props> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const toggleColorMode = useToggleColorMode();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { HomeLink, FavLink, ToggleDarkMode } = HeaderTexts;

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Typography color="primary.contrastText">
          <MenuIcon />
        </Typography>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
          sx: {
            justifyContent: 'center',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          divider
          onClick={handleClose}
          sx={{
            justifyContent: 'center',
          }}
        >
          <MobileLink exact to={Routes.Home} activeClassName="activeRoute">
            {HomeLink}
          </MobileLink>
        </MenuItem>
        <MenuItem divider onClick={handleClose}>
          <MobileLink to={Routes.Favorites} activeClassName="activeRoute">
            {FavLink}
          </MobileLink>
        </MenuItem>
        <MenuItem
          sx={{
            justifyContent: 'center',
          }}
        >
          <Tooltip title={ToggleDarkMode}>
            <StyledModeIcon fontSize="large" onClick={toggleColorMode} />
          </Tooltip>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileNav;
