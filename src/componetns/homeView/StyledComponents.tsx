import styled from 'styled-components';
import Box from '@mui/material/Box';

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

export { StyledBox, StyledHeader, WeatherText };
