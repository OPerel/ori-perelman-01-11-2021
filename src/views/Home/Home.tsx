import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  fetchAutoCompleteOptions,
  fetchCurrentWeather,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';

interface Props {}

const StyledAlert = styled(Alert)`
  margin: 5% auto;
`;

const StyledBox = styled(Box)`
  margin: 4% auto;
  text-align: center;
`;

const CurrentLocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  text-align: start;
`;

const WeatherText = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
`;

const Home: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const {
    inputValue,
    options,
    status: autoCompleteStatus,
    error: autoCompleteError,
  } = useAppSelector(state => state.autoComplete);
  const {
    value,
    data,
    status: currentWeatherStatus,
    error: currentWeatherError,
  } = useAppSelector(state => state.currentWeather);
  const [fav, setFav] = useState(false);

  console.log('inputValue: ', inputValue);
  console.log('options: ', options);

  console.log('value: ', value);
  console.log('data: ', data);
  return (
    <Container>
      <Box>
        <Autocomplete
          loading={autoCompleteStatus === 'loading'}
          options={options}
          inputValue={inputValue}
          getOptionLabel={option => option.LocalizedName || ''}
          onInputChange={(e, newInput) => {
            // if (newInput) {
              console.log('dispatching');
              dispatch(fetchAutoCompleteOptions(newInput));
            // }
          }}
          value={value}
          onChange={(e, newValue) => {
            // if (newValue) {
              dispatch(fetchCurrentWeather(newValue));
            // }
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
        {autoCompleteError && (
          <StyledAlert severity="error">{autoCompleteError}</StyledAlert>
        )}
      </Box>

      <StyledBox>
        {currentWeatherStatus === 'loading' ? (
          <CircularProgress color="secondary" size={50} />
        ) : currentWeatherError ? (
          <StyledAlert>{currentWeatherError}</StyledAlert>
        ) : (
          data && (
            <Card>
              <CardContent>
                <CurrentLocationHeader>
                  <div>
                    <Typography variant="h4" color="primary">
                      {inputValue}
                    </Typography>
                    <Typography variant="h6" color="secondary">
                      {data.currentWeather[0].Temperature.Metric.Value} &#8451;
                    </Typography>
                  </div>
                  <div>
                    <Tooltip
                      title={fav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <IconButton onClick={() => setFav(!fav)}>
                        {fav ? (
                          <Favorite fontSize="large" color="error" />
                        ) : (
                          <FavoriteBorderIcon fontSize="large" color="error" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </div>
                </CurrentLocationHeader>
                <WeatherText>
                  <Typography variant="h3" color="info.dark">
                    {data.currentWeather[0].WeatherText}
                  </Typography>
                </WeatherText>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  // spacing={{ xs: 1, sm: 4, md: 5 }}
                  spacing={8}
                  justifyContent="center"
                >
                  {data.forecast.DailyForecasts.map((day: any) => {
                    const dayStr = mapDays(new Date(day.Date).getDay());
                    return (
                      <Card key={day.EpochDate} sx={{ padding: '1% 1%' }}>
                        <CardContent>
                          <Typography variant="h4" color="info.main">
                            {dayStr}
                          </Typography>
                          <Typography variant="body1" color="secondary" mt={2}>
                            {day.Temperature.Minimum.Value} -{' '}
                            {day.Temperature.Maximum.Value} &#8451;
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          )
        )}
      </StyledBox>
    </Container>
  );
};

export default Home;

const mapDays = (day: number): string =>
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
