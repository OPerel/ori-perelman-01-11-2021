import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getFavWeather,
  removeFromFavorites,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import AppAlert from '../common/Alert';
import { FavButtonTooltip, Routes } from '../../utils/constants';
import { RemoveFav, StyledCard, StyledContent } from './StyledComponents';
import Delete from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';

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

  const handleRemoveFromFavorites = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    dispatch(removeFromFavorites(locationKey));
  };

  useEffect(() => {
    dispatch(getFavWeather(locationKey));
  }, [dispatch, locationKey]);

  if (error) {
    return <AppAlert message={error} />;
  }

  return (
    <StyledCard onClick={handleCardClick}>
      <Tooltip title={FavButtonTooltip.Remove}>
        <RemoveFav onClick={handleRemoveFromFavorites}>
          <Delete color="primary" />
        </RemoveFav>
      </Tooltip>
      <StyledContent>
        <div>
          <Typography variant="h5" color="primary">
            {name}
          </Typography>
          {status === 'loading' ? (
            <CircularProgress size={35} sx={{ marginTop: '25%' }} />
          ) : (
            weather && (
              <Typography variant="body1" color="secondary" mt={0}>
                {weather[0].Temperature.Metric.Value} - &#8451;
              </Typography>
            )
          )}
        </div>
        {weather && (
          <Typography variant="h6" color="secondary" mt={3}>
            {weather[0].WeatherText}
          </Typography>
        )}
      </StyledContent>
    </StyledCard>
  );
};

export default FavoriteCard;
