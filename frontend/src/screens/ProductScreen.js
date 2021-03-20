import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import {
  Container,
  Grid,
  Button,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  productContainer: {
    marginTop: theme.spacing(10),
  },
  topSubGrid: {
    marginBottom: theme.spacing(2),
  },
  bottomGridContainer: {},
  productImg: {
    width: 600,
    objectFit: 'contain',
    height: 'auto',
    borderRadius: '5px',
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down('md')]: {
      width: 450,
    },
    [theme.breakpoints.down('sm')]: {
      width: 350,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
  },
  bottomGridMidItem: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
  },
  bottomMidTypo1: {
    paddingBottom: theme.spacing(5),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  Typo1: {
    display: 'flex',
    alignItems: 'center',
  },
  bottomMidTypo2: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  bottomGridRightItem: {
    padding: theme.spacing(1),
  },
  cartPaper: {
    padding: theme.spacing(2),
  },
  cartRow: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  cartBtn: {
    marginTop: theme.spacing(2),
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
  goBackBtn: {
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

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const classes = useStyles();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addToCart(product._id, qty));
    history.push('/cart');
  };

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.productContainer}>
        <Grid container className={classes.parentGridContainer}>
          <Grid
            item
            container
            justify='flex-start'
            xs={12}
            className={classes.topSubGrid}
          >
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button
                variant='contained'
                disableElevation
                className={classes.goBackBtn}
              >
                Go Back
              </Button>
            </Link>
          </Grid>

          {loading ? (
            <Grid container className={classes.bottomGridContainer}>
              <Grid item md={6}>
                <CircularProgress></CircularProgress>
              </Grid>
              <Grid item md={3} className={classes.bottomGridMidItem}>
                <CircularProgress></CircularProgress>
                <CircularProgress></CircularProgress>
                <CircularProgress></CircularProgress>
                <CircularProgress></CircularProgress>
              </Grid>
              <Grid item md={3} xs={12} className={classes.bottomGridRightItem}>
                <Paper className={classes.cartPaper}>
                  <Grid container xs={12} className={classes.cartRow}>
                    <Grid item xs={6}>
                      <CircularProgress></CircularProgress>
                    </Grid>
                    <Grid item xs={6}>
                      <CircularProgress></CircularProgress>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} className={classes.cartRow}>
                    <Grid item xs={6}>
                      <CircularProgress></CircularProgress>
                    </Grid>
                    <Grid item xs={6}>
                      <CircularProgress></CircularProgress>
                    </Grid>
                  </Grid>
                  <CircularProgress></CircularProgress>
                </Paper>
              </Grid>
            </Grid>
          ) : error ? (
            <Message variant='error' message={error}></Message>
          ) : (
            <Grid container className={classes.bottomGridContainer}>
              <Grid item md={6}>
                <img
                  src={product.image}
                  alt='proshop_airpods'
                  className={classes.productImg}
                />
              </Grid>
              <Grid item md={3} className={classes.bottomGridMidItem}>
                <Typography
                  variant='h5'
                  gutterBottom
                  className={classes.bottomMidTypo1}
                >
                  {product.name}
                </Typography>
                <Typography
                  gutterBottom
                  className={`${classes.bottomMidTypo2} ${classes.Typo1}`}
                >
                  {/* <Rating
                  name='half-rating-read'
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                  size='small'
                />
                {product.numReviews} reviews */}
                  <Rating
                    value={product.rating}
                    text={`out of ${product.numReviews} reviews`}
                  ></Rating>
                </Typography>
                <Typography
                  variant='body1'
                  gutterBottom
                  paragraph
                  className={classes.bottomMidTypo2}
                >
                  Price : ${product.price}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {product.description}
                </Typography>
              </Grid>
              <Grid item md={3} xs={12} className={classes.bottomGridRightItem}>
                <Paper className={classes.cartPaper}>
                  <Grid container xs={12} className={classes.cartRow}>
                    <Grid item xs={6}>
                      <Typography variant='subtitle1' gutterBottom>
                        Price :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='subtitle1' gutterBottom>
                        ${product.price}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container xs={12} className={classes.cartRow}>
                    <Grid item xs={6}>
                      <Typography variant='subtitle1' gutterBottom>
                        Stock :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='subtitle1' gutterBottom>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Typography>
                    </Grid>
                  </Grid>

                  {product.countInStock > 0 && (
                    <Grid container xs={12} className={classes.cartRow}>
                      <Grid item xs={6}>
                        <Typography variant='subtitle1' gutterBottom>
                          Quantity :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl variant='outlined'>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  )}

                  <Button
                    variant='contained'
                    fullWidth
                    disableElevation
                    className={classes.cartBtn}
                    disabled={product.countInStock > 0 ? false : true}
                    onClick={addToCartHandler}
                  >
                    ADD TO CART
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ProductScreen;
