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
import {
  FavButtonTooltip,
  Routes,
  StoreItemStatus,
} from '../../utils/constants';
import {
  RemoveFavorite,
  StyledFavoriteCard,
  StyledContent,
} from './StyledComponents';
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

  const handleFavoriteClick = () => {
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
    <StyledFavoriteCard onClick={handleFavoriteClick}>
      <Tooltip title={FavButtonTooltip.Remove}>
        <RemoveFavorite onClick={handleRemoveFromFavorites}>
          <Delete color="error" />
        </RemoveFavorite>
      </Tooltip>
      <StyledContent>
        <div>
          <Typography variant="h5" color="secondary">
            {name}
          </Typography>
          {status === StoreItemStatus.Loading ? (
            <CircularProgress
              color="info"
              size={35}
              sx={{ marginTop: '25%' }}
            />
          ) : (
            weather && (
              <Typography variant="body1" color="info.main" mt={0}>
                {weather[0].Temperature.Metric.Value} - &#8451;
              </Typography>
            )
          )}
        </div>
        {weather && (
          <Typography variant="h6" color="info.main" mt={3}>
            {weather[0].WeatherText}
          </Typography>
        )}
      </StyledContent>
    </StyledFavoriteCard>
  );
};

export default FavoriteCard;
