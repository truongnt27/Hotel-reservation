import React, { useState, useEffect } from 'react';
import { BookingTable, BookingToolBar } from './components';
import { makeStyles } from '@material-ui/styles';

import Axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const BookingList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:5000/bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <div className={classes.root}>
      <BookingToolBar />
      <div className={classes.content}>
        <BookingTable
          bookings={bookings}
          loading={loading}
        />
      </div>
    </div>
  )
}
export default BookingList;
