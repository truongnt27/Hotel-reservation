import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  roomContainer: {
    padding: theme.spacing(2),
  },
  roomImage: {
    paddingLeft: '20px'
  },
  image: {
    maxWidth: '350px',
    paddingRight: theme.spacing(2)
  },
  infoContainer: {
    padding: theme.spacing(1)
  },
  info: {
    textTransform: 'uppercase'
  },
  extras: {
    listStyleType: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
    gridColumnGap: '2rem',
    gridRowGap: '1rem'
  }
})
);

const RoomDetail = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  const [room, setRoom] = useState({
    id: '',
    name: '',
    type: '',
    price: 0,
    size: 0,
    capacity: 0,
    pets: false,
    breakfast: false,
    featured: false,
    description: '',
    extras: [],
    images: []
  });

  useEffect(() => {
    console.log(id);

    axios.post('http://localhost:5000/rooms/viewDetailRoom', {
      roomId: id
    })
      .then(res => {
        console.log(res.data);
        setRoom(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room;
  const [...defaultImages] = images;
  return (
    <Grid
      className={classes.roomContainer}
      container
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h1">{name}</Typography>
      </Grid>
      <Grid
        className={classes.roomImage}
        item
      >
        {defaultImages.map((item, index) => (
          <img
            alt={name}
            className={classes.image}
            key={index}
            src={`/images/rooms/${item}`}
          />
        ))}
      </Grid>

      <Grid
        className={classes.roomInfo}
        className={classes.infoContainer}
        container
        direction="row"
        spacing={2}
      >
        <Grid
          item
          sm={6}
          xl={12}
        >
          <Typography variant="h3">details</Typography>
          <Typography variant="body1">{description ? description : 'No details.'}</Typography>
        </Grid>
        <Grid
          className={classes.info}
          item
          sm={6}
          xl={12}
        >
          <Typography variant="h3">info</Typography>
          <Typography variant="body1">price : ${price}</Typography>
          <Typography variant="body1">size : {size} SQFT</Typography>
          <Typography variant="body1">
            max capacity :
            {capacity > 1 ? `${capacity} people` : `${capacity} person`}
          </Typography>
          <Typography variant="body1">{pets ? 'pets allowed' : 'no pets allowed'}</Typography>
          <Typography variant="body1">{breakfast && 'free breakfast included'}</Typography>
        </Grid>
      </Grid >
      <Grid item>
        <Typography variant="h3">extras </Typography>
        <ul className={classes.extras}>
          {extras.map((item, index) => (
            <li key={index}><Typography variant="body1">- {item}</Typography></li>
          ))}
        </ul>
      </Grid>
    </Grid >
  );
}
export default RoomDetail;
