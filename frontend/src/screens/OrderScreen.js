import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/Message';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderContants';

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
const OrderScreen = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_PAY_RESET });
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
    // eslint-disable-next-line
  }, [order, orderId]);

  const successPaymentHandler = (paymentResult) => {
    console.log('hi');
    dispatch(payOrder(order, paymentResult));
  };

  return (
    <Fragment>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <Message variant='error' open={true} message={error}></Message>
      ) : (
        <Container maxWidth='lg' className={classes.rootContainer}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12}></Grid>
            <Grid item md={8}>
              <Grid item className={classes.gridItem}>
                <Typography variant='h4' className={classes.leftTypo1}>
                  Shipping
                </Typography>
                <Typography variant='body2'>
                  {order.user.name} ,{' '}
                  <Link to={`mailto:${order.user.email}`}>
                    {order.user.email}
                  </Link>
                </Typography>
                <Typography variant='body1'>
                  {order.shippingAddress.address} , {order.shippingAddress.city}{' '}
                  ,{order.shippingAddress.postalCode} ,
                  {order.shippingAddress.country}
                </Typography>
                {order.isDelivered ? (
                  <Message
                    variant='success'
                    message={`Delivered at ${order.deliveredAt}`}
                  ></Message>
                ) : (
                  <Message variant='error' message={'Not delivered'}></Message>
                )}
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography variant='h4' className={classes.leftTypo1}>
                  Payment Method
                </Typography>
                <Typography variant='body2'>{order.paymentMethod}</Typography>
                {order.isPaid ? (
                  <Message
                    variant='success'
                    message={`Paid on ${order.paidAt}`}
                  ></Message>
                ) : (
                  <Message variant='error' message={'Not paid'}></Message>
                )}
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography variant='h4' className={classes.leftTypo1}>
                  Order Items
                </Typography>
                <Typography variant='body2'>
                  {order.orderItems.length === 0 ? (
                    <Message
                      open={true}
                      variant='info'
                      message='Your cart is empty'
                    ></Message>
                  ) : (
                    order.orderItems.map((item) => (
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
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
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
                        ${order.itemsPrice}
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
                        ${order.shippingPrice}
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
                        ${order.taxPrice}
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
                        ${order.totalPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                  {error && (
                    <Grid item xs={12}>
                      <Message
                        variant='error'
                        open={true}
                        message={error}
                      ></Message>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {!order.isPaid && (
                      <Grid item xs={12}>
                        {loadingPay && <CircularProgress></CircularProgress>}
                        {!sdkReady ? (
                          <CircularProgress></CircularProgress>
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          ></PayPalButton>
                        )}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default OrderScreen;
