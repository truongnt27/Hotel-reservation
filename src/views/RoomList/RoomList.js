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
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 6;
  const [totalRoom, setTotalRoom] = useState(0);
  const [roomFilter, setroomFilter] = useState({
    type: '',
    sortBy: '',
    price: 0
  })

  const handleFilter = (event) => {
    event.persist();
    setroomFilter(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
    setPageIndex(1);
  }

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

  const handlePagination = (type) => {
    if (type === 'prev') setPageIndex(prev => {
      return (prev == 1) ? 1 : prev - 1;
    });
    if (type === 'next') setPageIndex(prev => {
      return (prev * pageSize > totalRoom) ? prev : prev + 1;
    });
  }
  useEffect(() => {
    Axios.get('http://localhost:5000/rooms', {
      params: {
        pageIndex,
        pageSize,
        ...roomFilter
      }
    })
      .then(res => {
        setRooms(res.data.roomChunks);
        setTotalRoom(res.data.totalRoom);
      })
      .catch(err => {
        console.log(err);
      })
  }, [pageIndex, roomFilter])
  console.log(selectedRoom.id);
  return (
    <div className={classes.root}>
      <RoomsToolbar
        onChangeFilter={handleFilter}
        onOpenPopup={handleClickOpen}
        roomFilter={roomFilter}
      />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {rooms ? rooms.map(room => (
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
          )) : <Typography variant="body1">No rooms.</Typography>}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">{(pageIndex - 1) * pageSize + 1} - {(pageIndex * 6 > totalRoom) ? totalRoom : (pageIndex * pageSize)} of {totalRoom}</Typography>
        <IconButton onClick={() => handlePagination('prev')}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={() => handlePagination('next')}>
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
