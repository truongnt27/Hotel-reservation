import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { RoomsToolbar, RoomCard, RoomAddPopup, RoomEditPopup, RoomDeletePopup } from './components';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const initPopup = {
  add: false,
  edit: false,
  delete: false
}

const RoomList = () => {
  const classes = useStyles();

  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(initPopup);
  const [selectedRoom, setSelectedRoom] = useState({});

  const handleSelect = (room) => {
    setSelectedRoom(room);
  }

  const handleClickOpen = (type) => {
    switch (type) {
      case 'add':
        setOpen({
          add: true,
          edit: false,
          delete: false
        });
        break;
      case 'edit':
        setOpen({
          add: false,
          edit: true,
          delete: false
        });
        break;
      case 'delete':
        setOpen({
          add: false,
          edit: false,
          delete: true
        });
        break;
      default:
        setOpen(initPopup)
    }
  };
  const handleClose = () => {
    setOpen(initPopup);
  };

  useEffect(() => {
    Axios.get('http://localhost:5000/rooms')
      .then(res => {
        console.log(res.data);
        setRooms(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  console.log(selectedRoom.id);
  return (
    <div className={classes.root}>
      <RoomsToolbar onOpenPopup={handleClickOpen} />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {rooms.map(room => (

            <Grid
              item
              key={room.id}
              lg={4}
              md={6}
              xs={12}
            >
              <RoomCard
                onOpenPopup={handleClickOpen}
                onSelect={handleSelect}
                room={room}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <RoomAddPopup
        onClosePopup={handleClose}
        open={open.add}
      />
      <RoomEditPopup
        onClosePopup={handleClose}
        open={open.edit}
        room={selectedRoom}
      />
      <RoomDeletePopup
        onClosePopup={handleClose}
        open={open.delete}
        room={selectedRoom}
      />
    </div>
  );
};

export default RoomList;
