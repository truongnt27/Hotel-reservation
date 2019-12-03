import React, { useState, useEffect } from 'react'
import {
  Paper,
  Button,
  Snackbar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns/'
import { BookingStepper, BookingForm, BookingReview } from './components'
import MuiTable from 'mui-datatables'

import Axios from 'axios'
import validate from 'validate.js'

/*Make styles*/
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(3)
  },
  steps: {
    marginBottom: theme.spacing(3)
  },
  datePicker: {
    padding: theme.spacing(1)
  },
  table: {
    marginTop: theme.spacing(3)
  },
  searchIcon: {
    margin: theme.spacing(3),
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
  },

}));

/*Params room table*/
const cols = [
  {
    name: 'id',
    label: 'Room Id',
    options: {
      filter: false
    }
  },
  {
    name: 'name',
    label: 'Room Name',
    options: {
      filter: false
    }
  },
  {
    name: 'type',
    label: 'Type'
  },
  {
    name: 'capacity',
    label: 'Capacity'
  },
  {
    name: 'size',
    label: 'Size (m2)',
    options: {
      filter: false
    }
  },
  {
    name: 'price',
    label: 'Price',
    options: {
      filter: false
    }
  },

];


/*Params stepper*/
const getSteps = () => {
  return ['Choose a room', 'Payment details', 'Review your booking'];
}

const initDate = Date.now();

const BookingAddNew = () => {
  const classes = useStyles();
  const steps = getSteps();
  const [checkInDate, setCheckInDate] = useState(initDate);
  const [checkOutDate, setcheckOutDate] = useState(initDate);
  const [activeStep, setActiveStep] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomIdxs, setSelectedRoomIdxs] = useState([]);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  /*Form validation*/
  const schema = {
    fullname: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 64
      }
    },
    phone: {
      presence: { allowEmpty: false, message: 'is required' },
      numericality: true,
      length: {
        maximum: 12
      }
    },
    email: {
      email: {
        message: 'doesn\'t look like a valid email'
      },
      length: {
        maximum: 64
      }
    },
    cardNum: {
      presence: { allowEmpty: false, message: 'is required' },
      numericality: true
    },
    expDate: {
      presence: { allowEmpty: false, message: 'is required' },
    },
    cvv: {
      numericality: true
    }
  }

  const hasError = field => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  }

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  /*Handle user form changes*/
  const handleForm = (event) => {
    event.persist()
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  }

  /*Caculate total amount*/
  const calTotalAmount = () => {
    const roomArr = getRoomsfromIdx();
    const dayNum = (checkOutDate - checkInDate) / 86400000;
    return roomArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * dayNum;
    }, 0)
  }

  /*Validate date check in/out*/
  useEffect(() => {
    if (checkInDate <= checkOutDate) {
      Axios.get('http://localhost:5000/rooms/vailableRoomList', {
        params: {
          checkInDate: Date.parse(checkInDate),
          checkOutDate: Date.parse(checkOutDate)
        }
      })
        .then(res => {
          setRooms(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [checkInDate, checkOutDate])

  /*Handle room list*/
  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      setSelectedRoomIdxs(allRowsSelected.map(row => row.index));
    },
    customToolbarSelect: () => { },
    rowsSelected: selectedRoomIdxs
  }

  const getRoomsfromIdx = () => {
    return selectedRoomIdxs.map(index => {
      return rooms[index]
    })
  }

  /*Handle steppers*/

  // validate
  const validateStep = () => {
    if (selectedRoomIdxs.length < 0 || (checkInDate > checkOutDate)) {
      return false;
    }
    else if (activeStep === 1) {
      return formState.isValid
    }
    else return true;
  }
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);

      if (activeStep === 2) {
        Axios.post('http://localhost:5000/bookings/createBooking',
          {
            booking: {
              userInfo: formState.values,
              checkInDate: Date.parse(checkInDate),
              checkOutDate: Date.parse(checkOutDate),
              rooms: getRoomsfromIdx(),
              totalAmount: calTotalAmount()
            }
          })
          .then(res => {
            window.location = '/bookings'
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCheckInDate(initDate);
    setcheckOutDate(initDate);
    setSelectedRoomIdxs([]);
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
  };

  /*Handle date input*/
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  }
  const handleCheckOutChange = (date) => {
    setcheckOutDate(date);
  }

  return (
    <div className={classes.root}>
      <BookingStepper
        activeStep={activeStep}
        className={classes.steps}
        steps={steps}
      />
      {activeStep === 0 ? <Paper className={classes.content}>

        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
        >
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            error={(checkInDate > checkOutDate) ? 'Invalid date' : undefined}
            format="dd/MM/yyyy"
            helperText={'Check in date must less than check out'}
            inputVariant="outlined"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            label="Check In"
            margin="normal"
            name="checkIn"
            onChange={handleCheckInChange}
            required
            value={checkInDate}
            variant="inline"
          />
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            error={(checkInDate > checkOutDate) ? 'Invalid date' : undefined}
            format="dd/MM/yyyy"
            helperText={'Check in date must less than check out'}
            inputVariant="outlined"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            label="Check Out"
            margin="normal"
            name="checkOut"
            onChange={handleCheckOutChange}
            required
            value={checkOutDate}
            variant="inline"
          />
        </MuiPickersUtilsProvider>
      </Paper> :
        null
      }

      <div className={classes.content}>
        {
          activeStep === 0 &&
          <MuiTable
            columns={cols}
            data={rooms}
            options={options}
            title="List of rooms"
          />

        }
        {
          activeStep === 1 &&
          <BookingForm
            formState={formState}
            hasError={hasError}
            onChange={handleForm}
          />
        }
        {
          activeStep === 2 &&
          <BookingReview
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            selectedRooms={getRoomsfromIdx()}
            totalAmount={calTotalAmount()}
            userInfo={formState.values}
          />
        }
      </div>
      <div className={classes.buttons}>
        <Button
          className={classes.backButton}
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          color="primary"
          onClick={handleNext}
          variant="contained"
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default BookingAddNew;
