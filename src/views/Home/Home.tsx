import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import {
  fetchAutoCompleteOptions,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import styled from 'styled-components';

interface Props {}

const StyledAlert = styled(Alert)`
  margin: 5% auto;
`;

const Home: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { inputValue, options, status, error } = useAppSelector(
    state => state.autoComplete
  );
  return (
    <Container>
      <Autocomplete
        loading={status === 'loading'}
        options={options}
        inputValue={inputValue}
        onInputChange={(e, newInput) => {
          console.log('dispatching');
          dispatch(fetchAutoCompleteOptions(newInput));
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
                    {status === 'loading' && (
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
      {status === 'failed' && error && (
        <StyledAlert severity="error">{error}</StyledAlert>
      )}
    </Container>
  );
};

export default Home;
