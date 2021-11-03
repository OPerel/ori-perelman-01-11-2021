import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Favorites from './views/Favorites/Favorites';
import Header from './componetns/Header/Header';
import { Routes } from './utils/constants';
import Container from '@mui/material/Container';
import styled from 'styled-components';

const Background = styled.main(
  ({ theme }) => `
    width: 100vw;
    min-height: 100vh;
    background-color: ${theme.palette.background.default};
  `
);

const AppContainer = styled(Container)(
  ({ theme }) => `
    margin: 10% 0;
  
    ${theme.breakpoints.up('md')} {
      margin: 2% 0;
    }
  `
);

function App() {
  return (
    <Background>
      <Router>
        <Header />
        <AppContainer>
          <Route exact path={Routes.Home} component={Home} />
          <Route exact path={Routes.Favorites} component={Favorites} />
        </AppContainer>
      </Router>
    </Background>
  );
}

export default App;
