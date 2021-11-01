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
  value: '',
  data: null,
  status: 'idle',
  error: null,
};

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    fetchWeather: (state, action: PayloadAction<string>) => {
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

const { fetchWeather, setWeather, setError } = currentWeatherSlice.actions;

export const fetchCurrentWeather = (location: any): AppThunk => {
  console.log('fetchCurrentWeather: ', location);
  return async dispatch => {
    if (!location) {
      dispatch(setWeather(null));
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
