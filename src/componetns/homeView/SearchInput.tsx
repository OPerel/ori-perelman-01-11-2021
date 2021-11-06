import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
  currentCity,
  fetchAutoCompleteOptions,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import AppAlert from '../common/Alert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SearchInputTexts, StoreItemStatus } from '../../utils/constants';
import { useTheme } from '@mui/material';
import useInputValidation from '../../hooks/useInputValidation';
import SearchIcon from '@mui/icons-material/Search';
import { SearchInputBox } from './StyledComponents';

const SearchInput: React.FC = () => {
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
    <SearchInputBox>
      <Autocomplete
        loading={autoCompleteStatus === StoreItemStatus.Loading}
        options={options}
        isOptionEqualToValue={(o, v) => o.Key === v.Key}
        getOptionLabel={option => option.LocalizedName || ''}
        inputValue={inputValue}
        onInputChange={(e, newInput) => {
          dispatch(fetchAutoCompleteOptions(newInput));
        }}
        value={value}
        onChange={(e, newValue) => {
          newValue &&
            dispatch(
              currentCity({ name: newValue.LocalizedName, Key: newValue.Key })
            );
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
                startAdornment: <SearchIcon />,
                endAdornment: (
                  <React.Fragment>
                    {autoCompleteStatus === StoreItemStatus.Loading && (
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
    </SearchInputBox>
  );
};

export default SearchInput;
