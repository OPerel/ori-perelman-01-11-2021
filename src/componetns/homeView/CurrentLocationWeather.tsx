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
} from '../../store';
import Forecast from './Forecast';
import CurrentLocationHeader from './CurrentLocationHeader';
import { DefaultCity } from '../../utils/constants';

interface Props {
  locationName: string;
  locationKey: string;
  cityName: string;
  setCityName(name: string): void;
}

const CurrentLocationWeather: React.FC<Props> = ({
  locationName,
  locationKey,
  cityName,
  setCityName,
}) => {
  const dispatch = useAppDispatch();

  const {
    value,
    data,
    status: currentWeatherStatus,
    error: currentWeatherError,
  } = useAppSelector(state => state.currentWeather);

  const { favorites } = useAppSelector(state => state.favorites);

  const [fav, setFav] = useState<boolean>(value && value.Key in favorites);
  const handleFavClick = () => {
    if (fav) {
      dispatch(removeFromFavorites(value.Key));
    } else {
      dispatch(addToFavorites(value.Key, cityName));
    }
  };

  useEffect(() => {
    dispatch(getAllFavorites());
    if (
      currentWeatherStatus === 'idle' &&
      !currentWeatherError &&
      value === null
    ) {
      dispatch(fetchCurrentWeather({ Key: DefaultCity.Key }));
      setCityName(DefaultCity.Name);
    }
  }, [currentWeatherError, currentWeatherStatus, dispatch, setCityName, value]);

  useEffect(() => {
    setFav(value && value.Key in favorites);
  }, [value, favorites, locationName, locationKey]);

  if (currentWeatherError) {
    return <AppAlert message={currentWeatherError} />;
  }

  return (
    <StyledBox>
      {currentWeatherStatus === 'loading' ? (
        <CircularProgress color="secondary" size={50} />
      ) : (
        value &&
        data && (
          <Card>
            <CardContent>
              <CurrentLocationHeader
                cityName={cityName}
                temp={data.currentWeather[0].Temperature.Metric.Value}
                isFav={fav}
                handleFavClick={handleFavClick}
              />

              <WeatherText>
                <Typography variant="h3" color="info.dark">
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
