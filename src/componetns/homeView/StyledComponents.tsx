import styled from 'styled-components';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const StyledBox = styled(Box)`
  margin: 4% auto;
  text-align: center;
`;

const StyledHeader = styled.div`
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

const ForecastCard = styled(Card)(
  ({ theme }) => `
    &.css-1823jwr-MuiPaper-root-MuiCard-root,
    &.css-pi1gmu-MuiPaper-root-MuiCard-root {
      background-color: #00000011;
      box-shadow: 2px 4px 7px 2px ${theme.palette.secondary.main}44;
    }
  `
);

export { StyledBox, StyledHeader, WeatherText, ForecastCard };
