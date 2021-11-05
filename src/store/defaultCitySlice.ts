import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './';
import { DefaultCity, StoreItemStatus } from '../utils/constants';
import fetchUtil from '../utils/fetchUtil';

interface T {
  name: string;
  Key: string;
}

interface City extends T {}

interface DefaultCityState {
  city: City | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: DefaultCityState = {
  city: null,
  status: StoreItemStatus.Idle,
  error: null,
};

const defaultCitySlice = createSlice({
  name: 'defaultCity',
  initialState,
  reducers: {
    getGeoLocation: state => {
      console.log('loading default city');
      state.status = StoreItemStatus.Loading;
    },
    setLocation: (state, action: PayloadAction<City>) => {
      state.status = StoreItemStatus.Idle;
      state.city = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = StoreItemStatus.Failed;
      state.error = action.payload;
    },
  },
});

const { getGeoLocation, setLocation, setError } = defaultCitySlice.actions;

export const getDefaultCity = (): AppThunk => {
  console.log('getDefaultCity');
  return async dispatch => {
    dispatch(getGeoLocation());

    navigator.geolocation.getCurrentPosition(
      async geoPosition => {
        const latitude = geoPosition.coords.latitude;
        const longitude = geoPosition.coords.longitude;
        if (geoPosition) {
          try {
            const currentCity = await fetchUtil(
              `/locations/v1/cities/geoposition/search`,
              `${latitude},${longitude}`
            );
            const { LocalizedName: name, Key } = currentCity;
            dispatch(setLocation({ name, Key }));
          } catch (err) {
            dispatch(setError(err));
          }
        } else {
          dispatch(
            setLocation({
              name: DefaultCity.Name,
              Key: DefaultCity.Key,
            })
          );
        }
      },
      err => {
        console.warn(err);
        if (err.code !== 1) {
          dispatch(setError(err.message));
        }
        dispatch(
          setLocation({
            name: DefaultCity.Name,
            Key: DefaultCity.Key,
          })
        );
      }
    );
  };
};

export default defaultCitySlice;
