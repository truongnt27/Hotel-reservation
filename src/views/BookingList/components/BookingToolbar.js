import React from 'react'
import SearchInput from 'components/SearchInput';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const BookingToolbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <div className={classes.row} >
          <Typography variant={'h3'} >All bookings</Typography>
        </div>
        <span className={classes.spacer} />
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add booking
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default BookingToolbar;
