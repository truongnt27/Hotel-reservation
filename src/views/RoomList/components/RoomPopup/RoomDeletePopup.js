import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

const RoomDeletePopup = (props) => {
  const roomId = props.room.id;

  const handleClose = () => {
    props.onClosePopup()
  }
  const handleSubmit = () => {
    axios.post('http://localhost:5000/rooms/deleteRoom', { roomId: roomId })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={handleClose}
      open={props.open}
    >
      <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete room {roomId}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleSubmit}
        >
          Yes
        </Button>
        <Button
          autoFocus
          color="primary"
          onClick={handleClose}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoomDeletePopup;
