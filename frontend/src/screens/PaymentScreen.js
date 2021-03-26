import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    minHeight: '100vh',
  },
  gridContainer: {
    width: '45%',
    margin: '0 auto',
    marginTop: 100,
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  gridItem: {
    paddingBottom: 20,
  },

  SignInBtn: {
    backgroundColor: '#212121',
    color: '#f9c11c',
    '&:hover': {
      backgroundColor: '#212121',
    },
  },
}));

const PaymentScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.rootContainer}>
        <form onSubmit={submitHandler}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
              <CheckoutSteps step1 step2 step3></CheckoutSteps>
              <Typography gutterBottom variant='h4'>
                Payment Method
              </Typography>
            </Grid>

            <RadioGroup
              aria-label='payment'
              name='payment'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value='PayPal'
                control={<Radio />}
                label='PayPal'
              />
              <FormControlLabel
                value='Stripe'
                control={<Radio />}
                label='Stripe (Soon!)'
                disabled
              />
            </RadioGroup>

            <Grid item xs={12} className={classes.gridItem}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                className={classes.SignInBtn}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
};

export default PaymentScreen;
