import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './';
import { DefaultCity, StoreItemStatus } from '../utils/constants';
import fetchUtil from '../utils/fetchUtil';

interface City {
  name: string;
  Key: string;
}

interface CurrentCityState {
  city: City | null;
  isFavorite: boolean;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CurrentCityState = {
  city: null,
  isFavorite: false,
  status: StoreItemStatus.Idle,
  error: null,
};

const currentCitySlice = createSlice({
  name: 'defaultCity',
  initialState,
  reducers: {
    getGeoLocation: state => {
      state.status = StoreItemStatus.Loading;
    },
    setLocation: (state, action: PayloadAction<City>) => {
      state.status = StoreItemStatus.Idle;
      state.city = action.payload;
    },
    isFavorite: (state, action: PayloadAction<boolean>) => {
      state.status = StoreItemStatus.Idle;
      state.isFavorite = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = StoreItemStatus.Failed;
      state.error = action.payload;
    },
  },
});

const { getGeoLocation, setLocation, isFavorite, setError } =
  currentCitySlice.actions;

export const currentCity = (city?: City): AppThunk => {
  return async dispatch => {
    if (city) {
      dispatch(setLocation(city));
      return;
    }
    dispatch(getGeoLocation());
    navigator.geolocation.getCurrentPosition(
      async geoPosition => {
        const latitude = geoPosition.coords.latitude;
        const longitude = geoPosition.coords.longitude;
        try {
          const cityByGeoPosition = await fetchUtil(
            `/locations/v1/cities/geoposition/search`,
            `${latitude},${longitude}`
          );
          const { LocalizedName: name, Key } = cityByGeoPosition;
          dispatch(setLocation({ name, Key }));
        } catch (err) {
          dispatch(setError(err));
        }
      },
      err => {
        // if error is NOT due to user denying GeoLocation, set error
        if (err.code !== 1) {
          dispatch(setError(err.message));
        }
        // else set default city
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

export const getIsFavorite = (id: string): AppThunk => {
  return async dispatch => {
    try {
      const isFav = await fetchUtil('/is-favorite', id);
      dispatch(isFavorite(isFav));
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

export default currentCitySlice;
