import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderTexts, Routes } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  overflow: hidden;
  background-color: antiquewhite;
  box-shadow: 0 3px 15px 1px rgb(0 0 0 / 50%);
`;

const StyledLink = styled(NavLink)`
  padding: 10px 25px;
  border-radius: 5%;
  background-color: navy;
  color: aliceblue;

  &:hover {
    opacity: 0.8;
  }

  &.${props => props.activeClassName} {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Header: React.FC = () => {
  const { Title, HomeLink, FavLink } = HeaderTexts;
  return (
    <StyledHeader>
      <h1>{Title}</h1>
      <Stack direction="row" spacing={2}>
        <StyledLink to={Routes.Home} exact activeClassName="activeRoute">
          {HomeLink}
        </StyledLink>
        <StyledLink to={Routes.Favorites} activeClassName="activeRoute">
          {FavLink}
        </StyledLink>
      </Stack>
    </StyledHeader>
  );
};

export default Header;
