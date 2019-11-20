import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Select } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { SearchInput } from 'components';

import Axios from 'axios';
import FileSaver from 'file-saver';
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
    marginRight: theme.spacing(3)
  },
  button: {
    marginRight: theme.spacing(1),
  },
  inputType: {
    marginRight: theme.spacing(2),
  },
  sortBy: {
    marginRight: theme.spacing(2),
  },
  inputPrice: {
    width: '150px'
  }
}));

const RoomsToolbar = props => {
  const { className, ...rest } = props;
  const types = ['single', 'double', 'family'];
  const sortBy = ['name', 'price', 'size', 'capacity'];
  const classes = useStyles();

  const handleChange = (event) => {
    props.onChangeFilter(event)
  };
  const handleExport = () => {
    Axios({
      url: 'http://localhost:5000/rooms/exportExcel',
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      try {
        FileSaver.saveAs(new Blob([response.data]), 'room_list.xlsx');
      } catch (error) {
        console.log('Save file failed !!!');
      }
    })
  }

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
        <Grid className={classes.inputType}>
          <Typography >Type</Typography>
          <Select
            inputProps={{
              name: 'type',
            }}
            native
            onChange={handleChange}
          >
            <option value="" />
            {types.map(type => {
              return <option value={type} >{type}</option>
            })}
          </Select>
        </Grid>
        <Grid className={classes.sortBy}>
          <Typography >Sort by</Typography>
          <Select
            inputProps={{
              name: 'sortBy',
            }}
            native
            onChange={handleChange}
          >
            <option value="" />
            {sortBy.map(field => {
              return <option value={field} >{field}</option>
            })}
          </Select>
        </Grid>
        <Grid className={classes.inputPrice} >
          <Typography >Price {props.roomFilter.price}$</Typography>
          <input
            max={1000}
            min={0}
            name="price"
            onChange={handleChange}
            type="range"
            valueLabelDisplay="auto"
          />
        </Grid>
        <span className={classes.spacer} />
        <Button
          className={classes.button}
          onClick={handleExport}
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
