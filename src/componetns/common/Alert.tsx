import React from 'react';
import styled from 'styled-components';
import Alert from '@mui/material/Alert';

const StyledAlert = styled(Alert)`
  margin: 5% auto;
`;

interface AlertProps {
  message: string;
}

const AppAlert: React.FC<AlertProps> = ({ message }) => {
  return <StyledAlert severity="error">{message}</StyledAlert>;
};

export default AppAlert;
