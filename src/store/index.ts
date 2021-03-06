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
import currentCitySlice, {
  currentCity,
  getIsFavorite,
} from './currentCitySlice';

export const store = configureStore({
  reducer: {
    autoComplete: autoCompleteSlice.reducer,
    currentWeather: currentWeatherSlice.reducer,
    favorites: favoritesSlice.reducer,
    currentCity: currentCitySlice.reducer,
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export type Status = 'idle' | 'loading' | 'failed';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  fetchAutoCompleteOptions,
  fetchCurrentWeather,
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
  getFavWeather,
  currentCity,
  getIsFavorite,
  useAppDispatch,
  useAppSelector,
};
