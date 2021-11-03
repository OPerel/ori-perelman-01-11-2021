import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { getFavWeather, useAppDispatch, useAppSelector } from '../../store';
import AppAlert from '../common/Alert';
import { Routes } from '../../utils/constants';
import { StyledCard, StyledContent } from "./StyledComponents";

interface Props {
  locationKey: string;
  name: string;
}

const FavoriteCard: React.FC<Props> = ({ locationKey, name }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    currentWeather: weather,
    status,
    error,
  } = useAppSelector(state => state.favorites.favorites[locationKey]);

  const handleCardClick = () => {
    history.push(Routes.Home, {
      locationKey,
      locationName: name,
    });
  };

  useEffect(() => {
    dispatch(getFavWeather(locationKey));
  }, [dispatch, locationKey]);

  return (
    <StyledCard onClick={handleCardClick}>
      <StyledContent>
        <div>
          <Typography variant="h5" color="info.dark">
            {name}
          </Typography>
          {weather && (
            <Typography variant="body1" color="secondary" mt={0}>
              {weather[0].Temperature.Metric.Value} - &#8451;
            </Typography>
          )}
        </div>
        {status === 'loading' ? (
          <CircularProgress size={35} />
        ) : error ? (
          <AppAlert message={error} />
        ) : (
          weather && (
            <Typography variant="h6" color="info.main" mt={3}>
              {weather[0].WeatherText}
            </Typography>
          )
        )}
      </StyledContent>
    </StyledCard>
  );
};

export default FavoriteCard;
