import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Favorites from './views/Favorites/Favorites';
import Header from './componetns/Header/Header';
import { Routes } from './utils/constants';
import Container from '@mui/material/Container';
import styled from 'styled-components';

const AppContainer = styled(Container)`
  margin: 10% 0;
  
  @media only screen and (min-width: 768px) {
    margin: 2% 0;
  }
`;

function App() {
  return (
    <Router>
      <Header />
      <AppContainer>
        <Route exact path={Routes.Home} component={Home} />
        <Route exact path={Routes.Favorites} component={Favorites} />
      </AppContainer>
    </Router>
  );
}

export default App;
