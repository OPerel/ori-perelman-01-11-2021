import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { fetchCurrentWeather, useAppDispatch } from '../../store';
import { DefaultCity } from '../../utils/constants';
import SearchInput from '../../componetns/homeView/SearchInput';
import CurrentLocationWeather from '../../componetns/homeView/CurrentLocationWeather';

// TODO: validate only english in search input

interface LocationState {
  locationKey: string;
  locationName: string;
}

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();
  const history = useHistory();
  const locationName = location.state?.locationName;
  const locationKey = location.state?.locationKey;
  const [cityName, setCityName] = useState<string>(DefaultCity.Name);

  useEffect(() => {
    if (locationKey && locationName) {
      dispatch(fetchCurrentWeather({ Key: locationKey }));
      setCityName(locationName);
    } else {
      dispatch(fetchCurrentWeather({ Key: DefaultCity.Key }));
    }
  }, [dispatch, locationKey, locationName, history]);

  return (
    <Container>
      <SearchInput setCityName={setCityName} />
      <CurrentLocationWeather
        locationName={locationName}
        locationKey={locationKey}
        cityName={cityName}
        setCityName={setCityName}
      />
    </Container>
  );
};

export default Home;
