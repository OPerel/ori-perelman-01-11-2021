import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AlertTexts } from '../../utils/constants';

interface AlertProps {
  message: string;
}

const AppAlert: React.FC<AlertProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(!!message);
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle color="error">{AlertTexts.Title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>{AlertTexts.Close}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppAlert;
