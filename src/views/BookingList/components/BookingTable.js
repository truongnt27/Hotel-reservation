import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const BookingTable = props => {
  const { className, bookings, loading, ...rest } = props;

  const classes = useStyles();

  const [selectedBookings, setSelectedBookings] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { bookings } = props;

    let selectedBookings;

    if (event.target.checked) {
      selectedBookings = bookings.map(booking => booking._id);
    } else {
      selectedBookings = [];
    }

    setSelectedBookings(selectedBookings);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBookings.indexOf(id);
    let newSelectedBookings = [];

    if (selectedIndex === -1) {
      newSelectedBookings = newSelectedBookings.concat(selectedBookings, id);
    } else if (selectedIndex === 0) {
      newSelectedBookings = newSelectedBookings.concat(selectedBookings.slice(1));
    } else if (selectedIndex === selectedBookings.length - 1) {
      newSelectedBookings = newSelectedBookings.concat(selectedBookings.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBookings = newSelectedBookings.concat(
        selectedBookings.slice(0, selectedIndex),
        selectedBookings.slice(selectedIndex + 1)
      );
    }

    setSelectedBookings(newSelectedBookings);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBookings.length === bookings.length}
                      color="primary"
                      indeterminate={
                        selectedBookings.length > 0 &&
                        selectedBookings.length < bookings.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Booked Rooms</TableCell>
                  <TableCell>Check In/Out Date</TableCell>
                  <TableCell>Total Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                      <TableCell><Skeleton variant="rect" /></TableCell>
                    </TableRow>
                  </>
                ) :
                  bookings.slice(0, rowsPerPage).map(booking => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={booking._id}
                      selected={selectedBookings.indexOf(booking._id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedBookings.indexOf(booking._id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, booking._id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>{booking._id}</TableCell>
                      <TableCell>{booking.fullname}</TableCell>
                      <TableCell>{booking.phone}</TableCell>
                      <TableCell>{booking.email}</TableCell>
                      <TableCell>{booking.bookedRooms.map(room => room.id).join(',')}</TableCell>
                      <TableCell>{moment(booking.checkInDate).format('DD/MM/YYYY')}-{moment(booking.checkOutDate).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        ${booking.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={bookings.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

BookingTable.propTypes = {
  bookings: PropTypes.array.isRequired,
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default BookingTable;