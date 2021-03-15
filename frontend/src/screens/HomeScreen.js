import React, { Fragment, useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../components/Product';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products');

      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Grid container item xs={12} justify='flex-start'>
            <Typography variant='h3'>LATEST PRODUCTS</Typography>
          </Grid>
          <Grid container item xs={12}>
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default HomeScreen;
