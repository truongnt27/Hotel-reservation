import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {
  Grid,
  Button,
  Dialog,
  IconButton,
  TextField,
  Checkbox,
  Typography,
  Input
} from '@material-ui/core';
import axios from 'axios'
import validate from 'validate.js'
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },

  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 20,
    paddingBottom: 20,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center'
  },
  inputFile: {
    display: 'none'
  },
  upload: {
    marginTop: theme.spacing(2),

  }
}));
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      className={classes.root}
      disableTypography
      {...other}
    >
      <Typography variant="h2">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(({
  root: {
    margin: 0,
  },

}))(MuiDialogActions);

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  type: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  price: {
    presence: { allowEmpty: false, message: 'is required' },
  },
}
const RoomEditPopup = (props) => {
  const { room, open } = props;
  const [formState, setFormState] = useState({
    isValid: true,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {

    const values = { ...room, ...formState.values };
    const errors = validate(values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    const getValue = () => {
      switch (event.target.type) {
        case 'checkbox': return event.target.checked
        case 'file': return Object.values(event.target.files).map(file => file.name)
        default: return event.target.value
      }
    }

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: getValue()
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  }

  const handleSubmit = () => {
    axios.post('http://localhost:5000/rooms/updateRoom', {
      updateVal: { ...formState.values },
      id: room.id
    })
      .then((response) => {
        window.location = `/rooms/${response.data}`
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const classes = useStyles();
  const handleClose = () => {
    props.onClosePopup()
  }
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Edit Room {room.id}
        </DialogTitle>
        <DialogContent dividers>
          <form
            className={classes.form}
          >
            <TextField
              className={classes.textField}
              defaultValue={room.name}
              error={hasError('name')}
              fullWidth
              helperText={
                hasError('name') ? formState.errors.name[0] : null
              }
              label="Name"
              name="name"
              onChange={handleChange}
              required
              type="text"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              defaultValue={room.type}
              error={hasError('type')}
              fullWidth
              helperText={
                hasError('type') ? formState.errors.type[0] : null
              }
              label="Type"
              name="type"
              onChange={handleChange}
              required
              type="text"
              variant="outlined"
            />
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                xs={6}
              >
                <TextField
                  className={classes.textField}
                  defaultValue={room.price}
                  error={hasError('price')}
                  fullWidth
                  helperText={
                    hasError('price') ? formState.errors.price[0] : null
                  }
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  required
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={3}
              >
                <TextField
                  className={classes.textField}
                  defaultValue={room.capacity}
                  fullWidth
                  label="Capacity"
                  name="capacity"
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={3}
              >
                <TextField
                  className={classes.textField}
                  defaultValue={room.size}
                  fullWidth
                  label="Size"
                  name="size"
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <TextField
              className={classes.textField}
              defaultValue={room.description}
              fullWidth
              label="Description"
              multiline
              name="description"
              onChange={handleChange}
              type="text"
              variant="outlined"
            />
            <Grid
              className={classes.upload}
              container
              spacing={2}
            >
              <Grid item >
                <input
                  accept="image/*"
                  className={classes.inputFile}
                  id="contained-button-file"
                  multiple
                  name="images"
                  onChange={handleChange}
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <IconButton
                    aria-label="upload picture"
                    color="primary"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
              <Grid>
                <Input
                  defaultValue={room.images}
                  disabled
                  readOnly
                  value={formState.values.images}
                />
              </Grid>
            </Grid>

            <div className={classes.checkbox}>
              <Checkbox
                color="primary"
                defaultChecked={room.pets}
                name="pets"
                onChange={handleChange}

              />
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Pets
              </Typography>
              <Checkbox
                color="primary"
                defaultChecked={room.breakfast}
                name="breakfast"
                onChange={handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Breakfast
              </Typography>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            disabled={!formState.isValid}
            onClick={handleSubmit}
            variant="contained"
          >
            Save changes
          </Button>
          <Button
            color="primary"
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
RoomEditPopup.propTypes = {
  onClosePopup: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  room: PropTypes.object.isRequired
}

export default RoomEditPopup;