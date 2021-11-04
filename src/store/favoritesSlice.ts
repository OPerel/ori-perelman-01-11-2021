import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './';
import fetchUtil from '../utils/fetchUtil';
import { StoreItemStatus } from '../utils/constants';

interface Favorite {
  name: string;
  currentWeather?: any;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Favorite Items are structured as key - value pairs,
// where ids are set as keys and item data as value
interface Favorites {
  [key: string]: Favorite;
}

interface FavoritesState {
  favorites: Favorites;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: {},
  status: StoreItemStatus.Idle,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavorites: state => {
      state.status = StoreItemStatus.Loading;
    },
    addFavorite: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.status = StoreItemStatus.Idle;
      const { id, name } = action.payload;
      state.favorites[id] = { ...state.favorites[id], name };
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.status = StoreItemStatus.Idle;
      delete state.favorites[action.payload];
    },
    setFavorites: (state, action: PayloadAction<Favorites>) => {
      state.status = StoreItemStatus.Idle;
      state.favorites = action.payload;
    },
    getFavorite: (state, action) => {
      state.favorites[action.payload].status = StoreItemStatus.Loading;
    },
    setFavoriteWeather: (state, action: PayloadAction<any>) => {
      const { id, data } = action.payload;
      state.favorites[id].status = StoreItemStatus.Idle;
      state.favorites[id].currentWeather = data;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = StoreItemStatus.Failed;
      state.error = action.payload;
    },
  },
});

const {
  fetchFavorites,
  addFavorite,
  removeFavorite,
  setFavorites,
  getFavorite,
  setFavoriteWeather,
  setError,
} = favoritesSlice.actions;

export const addToFavorites = (id: string, name: string): AppThunk => {
  return async dispatch => {
    dispatch(fetchFavorites());
    try {
      const favoriteAdded = await fetchUtil('/add-favorite', `${id}:${name}`);
      dispatch(addFavorite(favoriteAdded));
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

export const removeFromFavorites = (favoriteId: string): AppThunk => {
  return async dispatch => {
    dispatch(fetchFavorites());
    try {
      const idToRemove = await fetchUtil('/remove-favorite', favoriteId);
      dispatch(removeFavorite(idToRemove));
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

export const getAllFavorites = (): AppThunk => {
  return async dispatch => {
    dispatch(fetchFavorites());
    try {
      const favorites = await fetchUtil('/get-favorites', 'true');
      dispatch(setFavorites(favorites));
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

export const getFavWeather = (locationKey: string): AppThunk => {
  return async dispatch => {
    dispatch(getFavorite(locationKey));
    try {
      const weather = await fetchUtil(`/currentconditions/v1/${locationKey}`);
      dispatch(setFavoriteWeather({ id: locationKey, data: weather }));
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

export default favoritesSlice;
