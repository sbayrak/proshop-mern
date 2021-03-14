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

const Rating = ({ value, text, color }) => {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.rating}>
      {value >= 1 ? (
        <StarIcon style={{ color }}></StarIcon>
      ) : value >= 0.5 ? (
        <StarHalfIcon></StarHalfIcon>
      ) : (
        <StarBorderIcon></StarBorderIcon>
      )}

      {value >= 2 ? (
        <StarIcon style={{ color }}></StarIcon>
      ) : value >= 1.5 ? (
        <StarHalfIcon style={{ color }}></StarHalfIcon>
      ) : (
        <StarBorderIcon style={{ color }}></StarBorderIcon>
      )}

      {value >= 3 ? (
        <StarIcon style={{ color }}></StarIcon>
      ) : value >= 2.5 ? (
        <StarHalfIcon style={{ color }}></StarHalfIcon>
      ) : (
        <StarBorderIcon style={{ color }}></StarBorderIcon>
      )}

      {value >= 4 ? (
        <StarIcon style={{ color }}></StarIcon>
      ) : value >= 3.5 ? (
        <StarHalfIcon style={{ color }}></StarHalfIcon>
      ) : (
        <StarBorderIcon style={{ color }}></StarBorderIcon>
      )}

      {value >= 5 ? (
        <StarIcon style={{ color }}></StarIcon>
      ) : value >= 4.5 ? (
        <StarHalfIcon style={{ color }}></StarHalfIcon>
      ) : (
        <StarBorderIcon style={{ color }}></StarBorderIcon>
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
