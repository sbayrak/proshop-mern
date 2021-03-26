import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { saveShippingAddress } from '../actions/cartActions';
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

const ShippingScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.rootContainer}>
        <form onSubmit={submitHandler}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
              <CheckoutSteps step1 step2></CheckoutSteps>
              <Typography gutterBottom variant='h4'>
                Shipping
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.gridItem}>
              <TextField
                label='Address'
                // helperText='error message'
                variant='outlined'
                fullWidth
                color='primary'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} className={classes.gridItem}>
              <TextField
                label='City'
                // helperText='error message'
                variant='outlined'
                fullWidth
                color='primary'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} className={classes.gridItem}>
              <TextField
                label='Postal code'
                // helperText='error message'
                variant='outlined'
                fullWidth
                color='primary'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <TextField
                label='Country'
                // helperText='error message'
                variant='outlined'
                fullWidth
                color='primary'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} className={classes.gridItem}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                className={classes.SignInBtn}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
};

export default ShippingScreen;
