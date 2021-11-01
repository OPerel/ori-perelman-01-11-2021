import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Favorites from './views/Favorites/Favorites';
import Header from './componetns/Header/Header';
import { Routes } from './utils/constants';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path={Routes.HOME} component={Home} />
      <Route exact path={Routes.Favorites} component={Favorites} />
    </Router>
  );
}

export default App;
