import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import autoCompleteSlice, {
  fetchAutoCompleteOptions,
} from './autoCompleteSlice';

export const store = configureStore({
  reducer: {
    autoComplete: autoCompleteSlice.reducer,
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

export { fetchAutoCompleteOptions, useAppDispatch, useAppSelector };
