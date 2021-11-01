import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './';
import fetchUtil from '../utils/fetchUtil';

interface AutoCompleteState {
  inputValue: string;
  options: string[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AutoCompleteState = {
  inputValue: '',
  options: [],
  status: 'idle',
  error: null,
};

const autoCompleteSlice = createSlice({
  name: 'autoComplete',
  initialState,
  reducers: {
    fetchOptions: (state, action: PayloadAction<string>) => {
      state.status = 'loading';
      state.inputValue = action.payload;
    },
    setOptions: (state, action: PayloadAction<any[]>) => {
      state.status = 'idle';
      state.options = action.payload.map(local => local.LocalizedName);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

const { fetchOptions, setOptions, setError } = autoCompleteSlice.actions;

export const fetchAutoCompleteOptions = (searchString: string): AppThunk => {
  return async dispatch => {
    dispatch(fetchOptions(searchString));
    try {
      const response = await fetchUtil(
        '/locations/v1/cities/autocomplete',
        searchString
      );
      dispatch(setOptions(response));
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

export default autoCompleteSlice;
