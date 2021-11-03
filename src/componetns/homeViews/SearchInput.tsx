import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
  fetchAutoCompleteOptions,
  fetchCurrentWeather,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import AppAlert from '../common/Alert';
import Box from '@mui/material/Box';
import {DefaultCity} from "../../utils/constants";

interface SearchInputProps {
  setCityName(name: string): void;
}

const SearchInput: React.FC<SearchInputProps> = ({ setCityName }) => {
  const dispatch = useAppDispatch();

  const {
    inputValue,
    options,
    status: autoCompleteStatus,
    error: autoCompleteError,
  } = useAppSelector(state => state.autoComplete);
  const { value } = useAppSelector(state => state.currentWeather);

  return (
    <Box>
      <Autocomplete
        loading={autoCompleteStatus === 'loading'}
        options={options}
        inputValue={inputValue}
        getOptionLabel={option => option.LocalizedName || ''}
        onInputChange={(e, newInput) => {
          dispatch(fetchAutoCompleteOptions(newInput));
        }}
        value={value}
        onChange={(e, newValue) => {
          dispatch(fetchCurrentWeather(newValue));
          setCityName(newValue?.LocalizedName || DefaultCity.Name);
        }}
        renderInput={params => {
          return (
            <TextField
              {...params}
              label="City"
              variant="filled"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {autoCompleteStatus === 'loading' && (
                      <CircularProgress color="inherit" size={25} />
                    )}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          );
        }}
      />
      {autoCompleteError && <AppAlert message={autoCompleteError} />}
    </Box>
  );
};

export default SearchInput;
