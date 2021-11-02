import React, { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { getFavWeather, useAppDispatch, useAppSelector } from '../../store';
import AppAlert from '../common/Alert';
import { CircularProgress } from '@mui/material';
import styled from "styled-components";


const StyledCard = styled(Card)`
  min-width: 100%;
  height: 30vh;
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
  const {
    currentWeather: weather,
    status,
    error,
  } = useAppSelector(state => state.favorites.favorites[locationKey]);

  useEffect(() => {
    dispatch(getFavWeather(locationKey));
  }, [dispatch, locationKey]);

  return (
    <StyledCard>
      <StyledContent>
        <div>
          <Typography variant="h5" color="info.dark">{name}</Typography>
          {weather && (
            <Typography variant="body1" color="secondary" mt={0}>
              {weather[0].Temperature.Metric.Value} - &#8451;
            </Typography>
          )}
        </div>
        {status === 'loading' ? (
          <CircularProgress size={35}  />
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
