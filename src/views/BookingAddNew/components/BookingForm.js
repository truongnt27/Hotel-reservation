import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))

const BookingForm = (props) => {
  const classes = useStyles();
  const { formState, hasError } = props;
  const userInfo = formState.values;

  const handleChanges = (e) => {
    props.onChange(e)
  }

  return (
    <Paper className={classes.root}>
      <Typography
        gutterBottom
        variant="h5"
      >
        Payment method
      </Typography>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            error={hasError('fullname')}
            fullWidth
            helperText={
              hasError('fullname') ? formState.errors.fullname[0] : null
            }
            label="Full name"
            name="fullname"
            onChange={handleChanges}
            required
            value={userInfo.fullname}

          />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            error={hasError('phone')}
            fullWidth
            helperText={
              hasError('phone') ? formState.errors.phone[0] : null
            }
            label="Phone"
            name="phone"
            onChange={handleChanges}
            required
            value={userInfo.phone}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            error={hasError('email')}
            fullWidth
            helperText={
              hasError('email') ? formState.errors.email[0] : null
            }
            label="Email"
            name="email"
            onChange={handleChanges}
            value={userInfo.email}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            error={hasError('fullname')}
            fullWidth
            helperText={
              hasError('cardNum') ? formState.errors.cardNum[0] : null
            }
            label="Card number"
            name="cardNum"
            onChange={handleChanges}
            required
            value={userInfo.cardNum}
          />

        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            error={hasError('expDate')}
            fullWidth
            helperText={
              hasError('expDate') ? formState.errors.expDate[0] : null
            }
            label="Expiry Date( dd/mm/yyyy)"
            name="expDate"
            onChange={handleChanges}
            required
            value={userInfo.expDate}
          />

        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <TextField
            fullWidth
            helperText="Last three digits on signature strip"
            label="CVV"
            name="cvv"
            onChange={handleChanges}
            value={userInfo.cvv}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="saveCard"
                value="yes"
              />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

BookingForm.propTypes = {
  formState: PropTypes.object.isRequired,
  hasError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BookingForm
