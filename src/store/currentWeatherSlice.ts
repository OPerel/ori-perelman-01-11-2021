import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './';
import fetchUtil from '../utils/fetchUtil';

interface LocationData {
  currentWeather: any;
  forecast: any;
}

interface CurrentWeatherState {
  value: any;
  data: LocationData | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CurrentWeatherState = {
  value: null,
  data: null,
  status: 'idle',
  error: null,
};

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    reset: state => {
      state.value = null;
      state.data = null;
      state.status = 'idle';
    },
    fetchWeather: (state, action: PayloadAction<any>) => {
      state.status = 'loading';
      state.value = action.payload;
    },
    setWeather: (state, action: PayloadAction<any>) => {
      state.status = 'idle';
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

const { reset, fetchWeather, setWeather, setError } = currentWeatherSlice.actions;

export const fetchCurrentWeather = (location: any): AppThunk => {
  return async dispatch => {
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
