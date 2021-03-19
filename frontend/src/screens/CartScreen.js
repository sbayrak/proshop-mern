import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
  Grid,
  Typography,
  Container,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Button,
  Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cartContainer: {
    border: '1px solid red',
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
  rootContainer: {
    border: '1px solid blue',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  rightTopTypo: {
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(1),
    },
  },
  rightTopTypo1: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  itemsContainer: {
    border: '1px solid cyan',
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
  },
  cartItems: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  cartImg: {
    width: 100,
    borderRadius: '5px',
    boxShadow: theme.shadows[1],
  },
  cartLink: {
    textDecoration: 'none',
    color: theme.palette.grey[800],
  },
  trashBtn: {
    backgroundColor: '#212121',
    color: '#f9c11c',
    transition: '0.8s ease',
    '&:hover': {
      backgroundColor: theme.palette.grey[900],
      color: '#fff',
    },
  },
  gridLeftContainer: {
    border: '1px solid red',
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  leftTypo2: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  checkBtn: {
    backgroundColor: theme.palette.grey[800],
    color: '#f9c11c',
    transition: '0.8s ease',
    '&:hover': {
      backgroundColor: theme.palette.grey[900],
      color: '#fff',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
}));

const CartScreen = ({ match, location, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.cartContainer}>
        <Grid container className={classes.rootContainer}>
          <Grid container md={8}>
            <Grid item xs={12} className={classes.rightTopTypo}>
              <Typography variant='h4' className={classes.rightTopTypo1}>
                SHOPPING CART
              </Typography>
            </Grid>
            <Grid container xs={12} className={classes.itemsContainer}>
              {cartItems.length === 0 ? (
                <Message message={'Your cart is empty'}></Message>
              ) : (
                cartItems.map((item) => (
                  <Grid item container className={classes.cartItems}>
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
                        <Typography variant='subtitle1' gutterBottom>
                          {item.name}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Typography variant='subtitle1' gutterBottom>
                        ${item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <FormControl variant='outlined'>
                        <Select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <IconButton
                        className={classes.trashBtn}
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
          <Grid item md={4} className={classes.gridLeftContainer}>
            <Paper className={classes.paper} elevation={3}>
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <Typography
                    variant='h5'
                    gutterBottom
                    className={classes.leftTypo2}
                  >
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </Typography>
                  <Typography
                    variant='body1'
                    gutterBottom
                    className={classes.leftTypo2}
                  >
                    Total : $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    disableElevation
                    fullWidth
                    className={classes.checkBtn}
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    PROCEED TO CHECKOUT
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

export default CartScreen;
