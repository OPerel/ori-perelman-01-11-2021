import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import {
  getAllFavorites,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { CircularProgress } from '@mui/material';
import AppAlert from '../../componetns/common/Alert';
import Typography from '@mui/material/Typography';
import FavoriteCard from '../../componetns/favorites/FavoriteCard';
import Stack from "@mui/material/Stack";

interface Props {}

const Favorites: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { favorites, status, error } = useAppSelector(state => state.favorites);

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);

  if (status === 'loading') {
    return <CircularProgress size={50} />;
  }

  if (error) {
    return <AppAlert message={error} />;
  }

  const favKeys = Object.keys(favorites);
  return (
    <Container sx={{ textAlign: 'center' }}>
      {favKeys.length > 0 ? (
        <Stack direction="row" spacing={5}>
          {favKeys.map(favKey => {
            const {name} = favorites[favKey];
            return <FavoriteCard key={favKey} locationKey={favKey} name={name}/>;
          })}
        </Stack>
      ) : (
        <Typography variant="h2" color="primary">
          No Favorites Yet!
        </Typography>
      )}
    </Container>
  );
};

export default Favorites;
