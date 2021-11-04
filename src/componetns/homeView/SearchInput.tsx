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
import Paper from '@mui/material/Paper';
import { DefaultCity, SearchInputTexts } from '../../utils/constants';
import { useTheme } from '@mui/material';
import useInputValidation from '../../hooks/useInputValidation';

interface SearchInputProps {
  setCityName(name: string): void;
}

const SearchInput: React.FC<SearchInputProps> = ({ setCityName }) => {
  const dispatch = useAppDispatch();
  const { mode } = useTheme().palette;
  const {
    inputValue,
    options,
    status: autoCompleteStatus,
    error: autoCompleteError,
  } = useAppSelector(state => state.autoComplete);
  const { value } = useAppSelector(state => state.currentWeather);
  const typeError = useInputValidation(inputValue);

  return (
    <Box>
      <Autocomplete
        loading={autoCompleteStatus === 'loading'}
        options={options}
        isOptionEqualToValue={(o, v) => o.Key === v.Key}
        getOptionLabel={option => option.LocalizedName || ''}
        inputValue={inputValue}
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
              label={SearchInputTexts.Label}
              variant="filled"
              error={typeError}
              helperText={typeError ? SearchInputTexts.Error : undefined}
              FormHelperTextProps={{
                error: typeError,
              }}
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
        PaperComponent={({ children }) => (
          <Paper
            style={{ background: mode === 'dark' ? '#03506F' : '#bdebf3' }}
          >
            {children}
          </Paper>
        )}
      />
      {autoCompleteError && <AppAlert message={autoCompleteError} />}
    </Box>
  );
};

export default SearchInput;
