import React, { useEffect } from 'react';
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
  useAppDispatch,
  useAppSelector,
  currentCity,
  getIsFavorite,
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
    isFavorite,
    status: currentCityStatus,
    error: currentCityError,
  } = useAppSelector(state => state.currentCity);

  const handleFavClick = () => {
    if (city) {
      if (isFavorite) {
        dispatch(removeFromFavorites(value.Key));
      } else {
        dispatch(addToFavorites(value.Key, city.name));
      }
      dispatch(getIsFavorite(city.Key));
    }
  };

  useEffect(() => {
    if (currentCityStatus === StoreItemStatus.Idle && city) {
      dispatch(getIsFavorite(city.Key));
      dispatch(fetchCurrentWeather(city));
    } else if (currentCityStatus === StoreItemStatus.Idle && !city) {
      dispatch(currentCity());
    }
  }, [city, currentCityStatus, dispatch]);

  const error = currentCityError || currentWeatherError;
  if (error) {
    return <AppAlert message={error} />;
  }

  const loading =
    currentWeatherStatus === StoreItemStatus.Loading ||
    currentCityStatus === StoreItemStatus.Loading;

  return (
    <StyledBox>
      {loading ? (
        <CircularProgress color="info" size={50} />
      ) : (
        city &&
        data && (
          <Card>
            <CardContent>
              <CurrentLocationHeader
                cityName={city.name}
                temp={data.currentWeather[0].Temperature.Metric.Value}
                isFavoriteLocation={isFavorite}
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
