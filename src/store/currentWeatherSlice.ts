import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './';
import fetchUtil from '../utils/fetchUtil';
import { StoreItemStatus } from '../utils/constants';

interface LocationData {
  currentWeather: any;
  forecast: any;
}

interface CurrentWeatherState {
  value: any;
  data: LocationData | null;
  isFav: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CurrentWeatherState = {
  value: null,
  data: null,
  isFav: false,
  status: StoreItemStatus.Idle,
  error: null,
};

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    reset: state => {
      state.value = null;
      state.data = null;
      state.status = StoreItemStatus.Idle;
    },
    fetchWeather: (state, action: PayloadAction<any>) => {
      state.status = StoreItemStatus.Loading;
      state.value = action.payload;
    },
    setWeather: (state, action: PayloadAction<any>) => {
      state.status = StoreItemStatus.Idle;
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = StoreItemStatus.Failed;
      state.error = action.payload;
    },
  },
});

const { reset, fetchWeather, setWeather, setError } =
  currentWeatherSlice.actions;

/**
 * Action thunk creator that accepts an object with a "Key" field.
 */
export const fetchCurrentWeather = (location: any): AppThunk => {
  return async (dispatch, getState) => {
    if (!location) {
      dispatch(reset());
      return;
    }
    dispatch(fetchWeather(location));
    try {
      const currentWeather = await fetchUtil(
        `/currentconditions/v1/${location.Key}`
      );
      const forecast = await fetchUtil(
        `/forecasts/v1/daily/5day/${location.Key}`
      );
      dispatch(
        setWeather({
          currentWeather,
          forecast,
        })
      );
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

export default currentWeatherSlice;
