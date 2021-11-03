import React from 'react';
import { StyledHeader } from './StyledComponents';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FavButtonTooltip } from "../../utils/constants";

interface Props {
  cityName: string;
  temp: string;
  isFav: boolean;
  handleFavClick(): void;
}

const CurrentLocationHeader: React.FC<Props> = ({
  cityName,
  temp,
  isFav,
  handleFavClick,
}) => {
  return (
    <StyledHeader>
      <div>
        <Typography variant="h4" color="primary">
          {cityName}
        </Typography>
        <Typography variant="h6" color="secondary">
          {temp} &#8451;
        </Typography>
      </div>
      <div>
        <Tooltip
          title={isFav ? FavButtonTooltip.Remove : FavButtonTooltip.Add}
        >
          <IconButton onClick={handleFavClick}>
            {isFav ? (
              <Favorite fontSize="large" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="large" color="error" />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </StyledHeader>
  );
};

export default CurrentLocationHeader;
