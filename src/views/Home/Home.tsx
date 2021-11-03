import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { fetchCurrentWeather, useAppDispatch } from '../../store';
import {DefaultCity, Routes} from '../../utils/constants';
import SearchInput from '../../componetns/homeViews/SearchInput';
import CurrentLocationWeather from '../../componetns/homeViews/CurrentLocationWeather';

// TODO: refactor error messages to a modal
// toggle dark theme
// remove favorite from /favoritesView as well
// validate only english in search input

interface LocationState {
  locationKey: string;
  locationName: string;
}
interface Props {}

const Home: React.FC<Props> = () => {
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
      history.replace(Routes.Home);
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
