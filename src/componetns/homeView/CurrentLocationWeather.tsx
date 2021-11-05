import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppAlert from '../common/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { StyledBox, WeatherText } from './StyledComponents';
import {
  addToFavorites,
  fetchCurrentWeather,
  removeFromFavorites,
  getAllFavorites,
  useAppDispatch,
  useAppSelector,
  currentCity,
} from '../../store';
import Forecast from './Forecast';
import CurrentLocationHeader from './CurrentLocationHeader';
import { StoreItemStatus } from '../../utils/constants';

const CurrentLocationWeather: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    value,
    data,
    status: currentWeatherStatus,
    error: currentWeatherError,
  } = useAppSelector(state => state.currentWeather);
  const {
    city,
    status: defaultCityStatus,
    error: defaultCityError,
  } = useAppSelector(state => state.defaultCity);
  const { favorites } = useAppSelector(state => state.favorites);
  const [isFavoriteLocation, setIsFavoriteLocation] = useState<boolean>(
    value && value.Key in favorites
  );

  const handleFavClick = () => {
    if (city) {
      if (isFavoriteLocation) {
        dispatch(removeFromFavorites(value.Key));
      } else {
        dispatch(addToFavorites(value.Key, city.name));
      }
    }
  };

  // on mount get default city and all favorites
  useEffect(() => {
    dispatch(getAllFavorites());
    if (defaultCityStatus === StoreItemStatus.Idle && city) {
      dispatch(fetchCurrentWeather(city));
    } else if (defaultCityStatus === StoreItemStatus.Idle && !city) {
      dispatch(currentCity());
    }
  }, [city, defaultCityStatus, dispatch]);

  // update location favorite status
  useEffect(() => {
    setIsFavoriteLocation(value && value.Key in favorites);
  }, [value, favorites]);

  const error = defaultCityError || currentWeatherError;
  if (error) {
    return <AppAlert message={error} />;
  }

  const loading =
    currentWeatherStatus === StoreItemStatus.Loading ||
    defaultCityStatus === StoreItemStatus.Loading;

  return (
    <StyledBox>
      {loading ? (
        <CircularProgress color="info" size={50} />
      ) : (
        city &&
        value &&
        data && (
          <Card>
            <CardContent>
              <CurrentLocationHeader
                cityName={city.name}
                temp={data.currentWeather[0].Temperature.Metric.Value}
                isFavoriteLocation={isFavoriteLocation}
                handleFavClick={handleFavClick}
              />

              <WeatherText>
                <Typography variant="h3" color="secondary">
                  {data.currentWeather[0].WeatherText}
                </Typography>
              </WeatherText>

              <Forecast forecast={data.forecast.DailyForecasts} />
            </CardContent>
          </Card>
        )
      )}
    </StyledBox>
  );
};

export default CurrentLocationWeather;
