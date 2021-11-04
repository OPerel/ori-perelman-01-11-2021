import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const StyledHeader = styled.header(
  ({ theme }) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1% 3%;
    overflow: hidden;
    background-color: ${theme.palette.primary.main};
    box-shadow: 0 3px 15px 1px rgb(0 0 0 / 50%)
  `
);

const StyledLink = styled(NavLink)(
  props => `
    padding: 10px 25px;
    border-radius: 5%;
    background-color: ${props.theme.palette.primary.dark};
    color: ${props.theme.palette.primary.contrastText};
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }

    &.${props.activeClassName} {
      opacity: 0.5;
      pointer-events: none;
    }
  `
);

const MobileLink = styled(NavLink)(
  props => `
    color: ${props.theme.palette.primary.dark};
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    
    &.${props.activeClassName} {
      opacity: 0.7;
      pointer-events: none;
      text-decoration: underline;
    }
  `
);

const StyledModeIcon = styled(Brightness4Icon)(
  ({ theme }) => `
    padding: 5px;
    color: ${theme.palette.mode === 'dark' ? '#000' : '#F0A500'}
  `
);

export { StyledLink, StyledHeader, StyledModeIcon, MobileLink };
