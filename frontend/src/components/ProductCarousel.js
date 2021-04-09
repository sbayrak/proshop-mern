import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { listTopProducts } from '../actions/productActions';
import { CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Message from './Message';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <Message message={error} variant='error'></Message>
      ) : (
        <Fragment>
          <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}></Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              enableMouseEvents
            >
              {products.map((step, index) => (
                <div key={step.label}>
                  <img
                    className={classes.img}
                    src={step.image}
                    alt={step.name}
                  />
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </div>
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductCarousel;
