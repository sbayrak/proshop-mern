import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
}));

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const classes = useStyles();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          {!keyword && <ProductCarousel></ProductCarousel>}
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
              <Fragment>
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </Fragment>
            )}
          </Grid>{' '}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Paginate>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
