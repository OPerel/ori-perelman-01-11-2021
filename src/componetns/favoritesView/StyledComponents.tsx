import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';

const StyledFavoriteCard = styled(Card)(
  ({ theme }) => `
    display: flex;
    flex-direction: column-reverse;
    min-width: 100%;
    height: 30vh;
    padding: 2%;
    transition: 0.4s;
  
    &:hover {
      box-shadow: 0 9px 12px 3px ${theme.palette.info.main}33;
      cursor: pointer;
      transition: 0.4s;
    }
  
    &:active {
      transform: scale(0.98);
      transition: 0.4s;
    }
  `
);

const StyledContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const RemoveFavorite = styled(IconButton)`
  align-self: end;

  &.css-1drgtl0-MuiButtonBase-root-MuiIconButton-root:hover {
    background-color: rgba(14, 104, 73, 0.2);
  }
`;

export { StyledFavoriteCard, StyledContent, RemoveFavorite };
