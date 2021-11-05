import React from 'react';
import Container from '@mui/material/Container';
import SearchInput from '../../componetns/homeView/SearchInput';
import CurrentLocationWeather from '../../componetns/homeView/CurrentLocationWeather';

const Home: React.FC = () => {
  return (
    <Container>
      <SearchInput />
      <CurrentLocationWeather />
    </Container>
  );
};

export default Home;
