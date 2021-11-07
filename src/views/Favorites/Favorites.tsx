import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { getAllFavorites, useAppDispatch, useAppSelector } from '../../store';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import AppAlert from '../../componetns/common/Alert';
import Typography from '@mui/material/Typography';
import FavoriteCard from '../../componetns/favoritesView/FavoriteCard';
import { FavoriteTexts, StoreItemStatus } from '../../utils/constants';

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favorites, status, error } = useAppSelector(state => state.favorites);

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  if (status === StoreItemStatus.Loading) {
    return <CircularProgress size={50} />;
  }

  if (error) {
    return <AppAlert message={error} />;
  }

  const favKeys = Object.keys(favorites);
  return (
    <Container sx={{ textAlign: 'center' }}>
      {favKeys.length > 0 ? (
        <Grid container spacing={3}>
          {favKeys.map(favKey => {
            const { name } = favorites[favKey];
            return (
              <Grid item key={favKey} xs={6} md={2}>
                <FavoriteCard locationKey={favKey} name={name} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="h2" color="primary">
          {FavoriteTexts.NoFavorites}
        </Typography>
      )}
    </Container>
  );
};

export default Favorites;
