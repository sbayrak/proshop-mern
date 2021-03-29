import React from 'react';
import { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
const useStyles = makeStyles((theme) => ({
  rootContainer: {
    minHeight: '100vh',
  },
  gridContainer: {
    marginTop: 100,
    padding: 10,
  },
  itemsContainer: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  gridItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  leftTypo1: {
    paddingBottom: theme.spacing(1),
    color: theme.palette.grey[700],
  },
  leftTypo2: {
    paddingBottom: theme.spacing(1),
    color: theme.palette.grey[700],
  },
  cartItems: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  cartImg: {
    width: 75,
    borderRadius: '5px',
    boxShadow: theme.shadows[1],
  },
  cartLink: {
    textDecoration: 'none',
    color: theme.palette.grey[800],
  },

  paper: {
    padding: theme.spacing(2),
  },
  checkBtn: {
    color: '#f9c11c',
    backgroundColor: theme.palette.grey[800],
    '&:hover': {
      backgroundColor: theme.palette.grey[700],
    },
  },
}));
const PlaceOrderScreen = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);

  const placeOrderHandler = (e) => {
    console.log('his');
  };

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.rootContainer}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
          </Grid>
          <Grid item md={8}>
            <Grid item className={classes.gridItem}>
              <Typography variant='h4' className={classes.leftTypo1}>
                Shipping
              </Typography>
              <Typography variant='body2'>
                {cart.shippingAddress.address} , {cart.shippingAddress.city} ,
                {cart.shippingAddress.postalCode} ,
                {cart.shippingAddress.country}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography variant='h4' className={classes.leftTypo1}>
                Payment Method
              </Typography>
              <Typography variant='body2'>{cart.paymentMethod}</Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography variant='h4' className={classes.leftTypo1}>
                Order Items
              </Typography>
              <Typography variant='body2'>
                {cart.cartItems.length === 0 ? (
                  <Message
                    open={true}
                    variant='info'
                    message='Your cart is empty'
                  ></Message>
                ) : (
                  cart.cartItems.map((item) => (
                    <Grid
                      item
                      container
                      className={classes.cartItems}
                      alignItems='center'
                    >
                      <Grid item md={2}>
                        <Link to={`/product/${item.product}`}>
                          <img
                            src={item.image}
                            alt='proshop_cart'
                            className={classes.cartImg}
                          ></img>
                        </Link>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Link
                          to={`/product/${item.product}`}
                          className={classes.cartLink}
                        >
                          <Typography variant='body2' gutterBottom>
                            {item.name}
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant='subtitle1' gutterBottom>
                          ${item.price}
                        </Typography>
                      </Grid>

                      <Grid item xs={4} md={2}>
                        <Typography variant='body2'>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={4} className={classes.gridLeftContainer}>
            <Paper className={classes.paper} elevation={3}>
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <Typography variant='h4' gutterBottom>
                    Order Summary
                  </Typography>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      Items
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      ${cart.itemsPrice}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      Shipping
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      ${cart.shippingPrice}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      Tax
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      ${cart.taxPrice}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      Total
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.leftTypo2}
                    >
                      ${cart.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    disableElevation
                    fullWidth
                    className={classes.checkBtn}
                    disabled={!cart.cartItems}
                    onClick={placeOrderHandler}
                  >
                    PLACE ORDER
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default PlaceOrderScreen;
