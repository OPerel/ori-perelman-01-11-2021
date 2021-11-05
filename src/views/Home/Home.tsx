import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { DefaultCity } from '../../utils/constants';
import SearchInput from '../../componetns/homeView/SearchInput';
import CurrentLocationWeather from '../../componetns/homeView/CurrentLocationWeather';

const Home: React.FC = () => {
  const [cityName, setCityName] = useState<string>(DefaultCity.Name);

  return (
    <Container>
      <SearchInput setCityName={setCityName} />
      <CurrentLocationWeather cityName={cityName} setCityName={setCityName} />
    </Container>
  );
};

export default Home;
