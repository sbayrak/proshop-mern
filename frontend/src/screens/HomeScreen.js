import React, { Fragment } from 'react';
import products from '../products';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../components/Product';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
}));

const HomeScreen = () => {
  const classes = useStyles();

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
