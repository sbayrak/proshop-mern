import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Grid container item xs={12} justify='flex-start'>
            <Typography variant='h3'>LATEST PRODUCTS</Typography>
          </Grid>
          <Grid container item xs={12}>
            {loading ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={3}>
                  <Loader></Loader>
                </Grid>
              ))
            ) : error ? (
              <Message open={true} variant='error' message={error}></Message>
            ) : (
              products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
