import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../utils/constants';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
   {
    margin: 3% 1%;
    padding: 0.5% 2%;
    border-radius: 5%;
    background-color: navy;
    color: aliceblue;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <header style={{ padding: '20px' }}>
      <nav>
        <StyledLink to={Routes.HOME}>Home</StyledLink>
        <NavLink to={Routes.Favorites}>Favorites</NavLink>
      </nav>
    </header>
  );
};

export default Header;
