import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const useStyles = makeStyles((theme) => ({
  rating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TypoReview: {
    marginLeft: theme.spacing(1),
  },
}));

const Rating = ({ value, text }) => {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.rating}>
      {value >= 1 ? (
        <StarIcon fontSize='small' style={{ color: '#ffb400' }}></StarIcon>
      ) : value >= 0.5 ? (
        <StarHalfIcon fontSize='small'></StarHalfIcon>
      ) : (
        <StarBorderIcon fontSize='small'></StarBorderIcon>
      )}

      {value >= 2 ? (
        <StarIcon fontSize='small' style={{ color: '#ffb400' }}></StarIcon>
      ) : value >= 1.5 ? (
        <StarHalfIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarHalfIcon>
      ) : (
        <StarBorderIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarBorderIcon>
      )}

      {value >= 3 ? (
        <StarIcon fontSize='small' style={{ color: '#ffb400' }}></StarIcon>
      ) : value >= 2.5 ? (
        <StarHalfIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarHalfIcon>
      ) : (
        <StarBorderIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarBorderIcon>
      )}

      {value >= 4 ? (
        <StarIcon fontSize='small' style={{ color: '#ffb400' }}></StarIcon>
      ) : value >= 3.5 ? (
        <StarHalfIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarHalfIcon>
      ) : (
        <StarBorderIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarBorderIcon>
      )}

      {value >= 5 ? (
        <StarIcon fontSize='small' style={{ color: '#ffb400' }}></StarIcon>
      ) : value >= 4.5 ? (
        <StarHalfIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarHalfIcon>
      ) : (
        <StarBorderIcon
          fontSize='small'
          style={{ color: '#ffb400' }}
        ></StarBorderIcon>
      )}

      <Typography variant='body2' className={classes.TypoReview}>
        {text && text}
      </Typography>
    </Box>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
