import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const BookingReview = (props) => {
  const classes = useStyles();
  const { selectedRooms, userInfo, totalAmount, checkInDate, checkOutDate } = props;

  return (
    <Paper className={classes.root}>
      <Typography
        gutterBottom
        variant="h5"
      >
        Booking summary
      </Typography>
      <List disablePadding>
        {selectedRooms.map(room => (
          <ListItem
            className={classes.listItem}
            key={room.id}
          >
            <ListItemText
              primary={room.id}
              secondary={room.name}
            />
            <Typography variant="body2">${room.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem} >
          <ListItemText primary="Check in/out date" />
          <Typography
            variant="body2"
          >
            {moment(checkInDate).format('DD/MM/YYYY')}-{moment(checkOutDate).format('DD/MM/YYYY')}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography
            className={classes.total}
            variant="subtitle1"
          >
            ${totalAmount}
          </Typography>
        </ListItem>
      </List>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          sm={6}
          xs={12}
        >
          <Typography
            className={classes.title}
            gutterBottom
            variant="h6"
          >
            Personal Info
          </Typography>
          <Typography gutterBottom>{userInfo.fullname}</Typography>
          <Typography gutterBottom>{userInfo.phone}</Typography>
          <Typography gutterBottom>{userInfo.email}</Typography>
        </Grid>
        <Grid
          container
          direction="column"
          item
          sm={6}
          xs={12}
        >
          <Typography
            className={classes.title}
            gutterBottom
            variant="h6"
          >
            Payment details
          </Typography>
          <Grid container>
            <>
              <Grid
                item
                xs={6}
              >
                <Typography gutterBottom>Card type</Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography gutterBottom>Visa</Typography>
              </Grid>
            </>
            <>
              <Grid
                item
                xs={6}
              >
                <Typography gutterBottom>Card number</Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography gutterBottom>{userInfo.cardNum}</Typography>
              </Grid>
            </>
            <>
              <Grid
                item
                xs={6}
              >
                <Typography gutterBottom>Expiry date</Typography>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography gutterBottom>{userInfo.expDate}</Typography>
              </Grid>
            </>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
BookingReview.propTypes = {
  checkInDate: PropTypes.number.isRequired,
  checkOutDate: PropTypes.number.isRequired,
  selectedRooms: PropTypes.array.isRequired,
  totalAmount: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired
};


export default BookingReview;