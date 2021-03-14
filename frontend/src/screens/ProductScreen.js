import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import products from '../products';
import Rating from '../components/Rating';
import { Container, Grid, Button, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  },
}));

const ProductScreen = ({ match }) => {
  const classes = useStyles();

  const product = products.find((product) => product._id === match.params.id);

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
              <Button variant='contained' disableElevation>
                Go Back
              </Button>
            </Link>
          </Grid>

          <Grid container item className={classes.bottomGridContainer}>
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
              <Typography gutterBottom className={classes.bottomMidTypo2}>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color='#edbd00'
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
            <Grid
              item
              md={3}
              sm={6}
              xs={12}
              className={classes.bottomGridRightItem}
            >
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
                <Button
                  variant='contained'
                  fullWidth
                  disableElevation
                  className={classes.cartBtn}
                  disabled={product.countInStock > 0 ? false : true}
                >
                  ADD TO CART
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ProductScreen;
