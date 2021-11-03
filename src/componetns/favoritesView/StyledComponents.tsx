import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const StyledCard = styled(Card)`
  min-width: 100%;
  height: 30vh;
  transition: 0.4s;

  &:hover {
    box-shadow: 0 9px 12px 3px rgb(0 0 0 / 34%);
    cursor: pointer;
    transition: 0.4s;
  }

  &:active {
    transform: scale(0.98);
    transition: 0.4s;
  }
`;

const StyledContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80%;
`;

export { StyledCard, StyledContent };
