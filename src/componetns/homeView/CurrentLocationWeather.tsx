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
  getDefaultCity,
} from '../../store';
import Forecast from './Forecast';
import CurrentLocationHeader from './CurrentLocationHeader';
import { StoreItemStatus } from '../../utils/constants';
import { useHistory, useLocation } from 'react-router-dom';

interface Props {
  cityName: string;
  setCityName(name: string): void;
}
interface LocationState {
  locationKey: string;
  locationName: string;
}

const CurrentLocationWeather: React.FC<Props> = ({ cityName, setCityName }) => {
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

  const location = useLocation<LocationState>();
  const history = useHistory();

  // TODO: better names for location state vars
  const locationName = location.state?.locationName;
  const locationKey = location.state?.locationKey;

  const handleFavClick = () => {
    if (isFavoriteLocation) {
      dispatch(removeFromFavorites(value.Key));
    } else {
      dispatch(addToFavorites(value.Key, cityName));
    }
  };

  // on mount get default city and all favorites
  useEffect(() => {
    dispatch(getDefaultCity());
    dispatch(getAllFavorites());
  }, [dispatch]);

  // get city information to display
  useEffect(() => {
    // if there's a city to display from favorites
    if (locationKey && locationName) {
      dispatch(fetchCurrentWeather({ Key: locationKey }));
      setCityName(locationName);

      // else get default city conditions
    } else {
      if (defaultCityStatus === StoreItemStatus.Idle && city) {
        dispatch(fetchCurrentWeather(city));
        setCityName(city.name);
      }
    }
  }, [
    dispatch,
    locationKey,
    locationName,
    history,
    setCityName,
    defaultCityStatus,
    city,
  ]);

  const { favorites } = useAppSelector(state => state.favorites);

  const [isFavoriteLocation, setIsFavoriteLocation] = useState<boolean>(
    value && value.Key in favorites
  );

  // update location favorite status
  useEffect(() => {
    setIsFavoriteLocation(value && value.Key in favorites);
  }, [value, favorites, locationName, locationKey]);

  const error = defaultCityError || currentWeatherError;
  if (error) {
    return <AppAlert message={error} />;
  }

  return (
    <StyledBox>
      {currentWeatherStatus === StoreItemStatus.Loading ||
      defaultCityStatus === StoreItemStatus.Loading ? (
        <CircularProgress color="info" size={50} />
      ) : (
        value &&
        data && (
          <Card>
            <CardContent>
              <CurrentLocationHeader
                cityName={cityName}
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
