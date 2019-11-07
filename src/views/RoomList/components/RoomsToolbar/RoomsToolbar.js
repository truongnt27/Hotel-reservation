import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { SearchInput } from 'components';

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
  },
  button: {
    marginRight: theme.spacing(1),
  }
}));

const RoomsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const handleOpen = () => {
    props.onOpenPopup('add')
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row} >
        <Typography variant={'h3'} >All rooms</Typography>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search room"
        />
        <span className={classes.spacer} />
        <Button
          className={classes.button}
          title="Export"
        >
          export
        </Button>
        <Button
          className={classes.button}
          color="primary"
          onClick={handleOpen}
          variant="contained"
        >
          add room
        </Button>
      </div>
    </div>
  );
};

RoomsToolbar.propTypes = {
  className: PropTypes.string
};

export default RoomsToolbar;
