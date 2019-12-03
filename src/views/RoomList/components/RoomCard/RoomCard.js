import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  CardActionArea,
  Grid,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1)
  },
  media: {
    height: 140,
  },
  name: {
    textTransform: 'capitalize'
  },
  spacer: {
    flexGrow: 1
  }
}));


const RoomCard = props => {
  const { className, room, ...rest } = props;

  const classes = useStyles();

  const handleOpenPopup = (type) => {
    props.onSelect(room);
    props.onOpenPopup(type);
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <CardActionArea>
        <Link to={`/rooms/${room.id}`} >
          <CardMedia
            className={classes.media}
            image={`/images/rooms/${room.images[0]}`}
            title={room.name}
          />
          <CardContent>

            <Typography
              className={classes.name}
              component="h2"
              gutterBottom
              variant="h4"
            >
              {room.name}
            </Typography>
            <Typography
              color="textSecondary"
              component="p"
              noWrap
              variant="body2"
            >
              {room.description ? room.description : 'No description.'}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Grid
          className={classes.statsItem}
          container
        >
          <Typography
            display="inline"
            variant="body2"
          >
            Price: {room.price}$
          </Typography>
          <span className={classes.spacer} />
          <IconButton
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              handleOpenPopup('edit');
            }}
            title="Edit"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            className={classes.button}
            onClick={(e) => {
              e.preventDefault();
              handleOpenPopup('delete');
            }}
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

RoomCard.propTypes = {
  className: PropTypes.string,
  onOpenPopup: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired
};

export default RoomCard;
