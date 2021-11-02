import React, { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { getFavWeather, useAppDispatch, useAppSelector } from '../../store';
import AppAlert from '../common/Alert';
import { CircularProgress } from '@mui/material';

interface Props {
  locationKey: string;
  name: string;
}

const FavoriteCard: React.FC<Props> = ({ locationKey, name }) => {
  const dispatch = useAppDispatch();
  const {
    currentWeather: weather,
    status,
    error,
  } = useAppSelector(state => state.favorites.favorites[locationKey]);

  useEffect(() => {
    dispatch(getFavWeather(locationKey));
  }, [dispatch, locationKey]);

  return (
    <Card sx={{ padding: '1% 1%' }}>
      <CardContent>
        <Typography variant="h4" color="info.dark">{name}</Typography>
        {status === 'loading' ? (
          <CircularProgress size={35} />
        ) : error ? (
          <AppAlert message={error} />
        ) : (
          weather && (
            <>
              <Typography variant="body1" color="secondary" mt={0}>
                {weather[0].Temperature.Metric.Value} - &#8451;
              </Typography>
              <Typography variant="h5" color="info.main">
                {weather[0].WeatherText}
              </Typography>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
