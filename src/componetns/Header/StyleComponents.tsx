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
    padding: 12px 25px;
    border-radius: 5%;
    background-color: ${props.theme.palette.primary.dark};
    color: ${props.theme.palette.primary.contrastText};
    text-decoration: none;
    font-weight: bold;

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
    color: ${props.theme.palette.secondary.main};
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
    padding: 7px;
    color: ${theme.palette.mode === 'dark' ? '#9a8888' : '#F0A500'};
    border-radius: 50%;
    
    &:hover {
      background-color: #00000033;
      cursor: pointer;
    }
  `
);

export { StyledLink, StyledHeader, StyledModeIcon, MobileLink };
