import React from 'react';
import mapDayToStr from '../../utils/mapDayToStr';
import Grow from '@mui/material/Grow';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ForecastCard } from './StyledComponents';

interface Props {
  forecast: any[];
}

const Forecast: React.FC<Props> = ({ forecast }) => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 3, md: 6 }}
      justifyContent="center"
    >
      {forecast.map((day: any, idx: number) => {
        const dayStr = mapDayToStr(day.Date);
        return (
          <Grow
            key={day.EpochDate}
            in
            style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: idx * 300 }}
          >
            <ForecastCard>
              <CardContent>
                <Typography variant="h4" color="primary">
                  {dayStr}
                </Typography>
                <Typography variant="body1" color="secondary" mt={2}>
                  {day.Temperature.Minimum.Value} -{' '}
                  {day.Temperature.Maximum.Value} &#8451;
                </Typography>
              </CardContent>
            </ForecastCard>
          </Grow>
        );
      })}
    </Stack>
  );
};

export default Forecast;
