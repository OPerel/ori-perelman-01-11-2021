import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { getFavWeather, useAppDispatch, useAppSelector } from '../../store';
import AppAlert from '../common/Alert';
import styled from 'styled-components';
import { Routes } from '../../utils/constants';

const StyledCard = styled(Card)`
  min-width: 100%;
  height: 30vh;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 9px 12px 3px rgb(0 0 0 / 34%);
    cursor: pointer;
    transition: 0.4s;
  }

  &:active {
    transform: scale(0.98);
    transition: 0.4s;
  }
`;

const StyledContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80%;
`;

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
      name,
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
