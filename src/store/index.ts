import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import autoCompleteSlice, {
  fetchAutoCompleteOptions,
} from './autoCompleteSlice';
import currentWeatherSlice, {
  fetchCurrentWeather,
} from './currentWeatherSlice';
import favoritesSlice, {
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
  getFavWeather,
} from './favoritesSlice';

export const store = configureStore({
  reducer: {
    autoComplete: autoCompleteSlice.reducer,
    currentWeather: currentWeatherSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout the app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  fetchAutoCompleteOptions,
  fetchCurrentWeather,
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
  getFavWeather,
  useAppDispatch,
  useAppSelector,
};