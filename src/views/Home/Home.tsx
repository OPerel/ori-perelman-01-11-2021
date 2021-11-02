import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import Grow from "@mui/material/Grow";
import {
  addToFavorites,
  fetchAutoCompleteOptions,
  fetchCurrentWeather,
  getAllFavorites,
  removeFromFavorites,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import AppAlert from '../../componetns/common/Alert';
import { Routes } from '../../utils/constants';

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

interface LocationState {
  locationKey: string;
  name: string;
}
interface Props {}

const Home: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();
  const history = useHistory();
  const name = location.state?.name;
  const locationKey = location.state?.locationKey;
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
  const { favorites } = useAppSelector(state => state.favorites);
  const [fav, setFav] = useState<boolean>(value && value.Key in favorites);
  const [cityName, setCityName] = useState<string>('Tel Aviv');

  const handleFavClick = () => {
    if (fav) {
      dispatch(removeFromFavorites(value.Key));
    } else {
      dispatch(addToFavorites(value.Key, cityName));
    }
  };

  useEffect(() => {
    if (locationKey && name) {
      dispatch(fetchCurrentWeather({ Key: locationKey }));
      setCityName(name);
      history.replace(Routes.Home);
    }
  }, [dispatch, locationKey, name, history]);

  useEffect(() => {
    dispatch(getAllFavorites());
    if (
      currentWeatherStatus === 'idle' &&
      !currentWeatherError &&
      value === null
    ) {
      dispatch(fetchCurrentWeather({ Key: 215854 }));
      setCityName('Tel Aviv');
    }
  }, [currentWeatherError, currentWeatherStatus, dispatch, value]);

  useEffect(() => {
    setFav(value && value.Key in favorites);
  }, [value, favorites, name, locationKey]);

  return (
    <Container>
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
            setCityName(newValue?.LocalizedName || 'Tel Aviv');
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

      <StyledBox>
        {currentWeatherStatus === 'loading' ? (
          <CircularProgress color="secondary" size={50} />
        ) : currentWeatherError ? (
          <AppAlert message={currentWeatherError} />
        ) : (
          value &&
          data && (
            <Card>
              <CardContent>
                <CurrentLocationHeader>
                  <div>
                    <Typography variant="h4" color="primary">
                      {cityName}
                    </Typography>
                    <Typography variant="h6" color="secondary">
                      {data.currentWeather[0].Temperature.Metric.Value} &#8451;
                    </Typography>
                  </div>
                  <div>
                    <Tooltip
                      title={fav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <IconButton onClick={handleFavClick}>
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
                  spacing={{ xs: 3, md: 6 }}
                  justifyContent="center"
                >
                  {data.forecast.DailyForecasts.map((day: any, idx: number) => {
                    const dayStr = mapDays(new Date(day.Date).getDay());
                    return (
                      <Grow
                        key={day.EpochDate}
                        in
                        style={{ transformOrigin: '0 0 0' }}
                        {...{ timeout: idx * 300 } }
                      >
                        <Card sx={{ padding: '1% 1%' }}>
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
                      </Grow>
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
