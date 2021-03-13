import React, { Fragment } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridProduct: {
    padding: theme.spacing(1.5),
  },
  cardDesc: {
    minHeight: 230,
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid item xs={12} sm={6} md={3} className={classes.gridProduct}>
        <Card>
          <CardActionArea>
            <CardMedia
              component='img'
              alt={product.name}
              height='160'
              image={product.image}
              title={product.name}
              style={{ objectFit: 'contain' }}
            />
            <CardContent className={classes.cardDesc}>
              <Typography gutterBottom variant='h6' component='h3'>
                {product.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Typography variant='body2'>
              {product.rating} out of {product.numReviews}
            </Typography>
            <Typography variant='body2'> {product.price}</Typography>
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default Product;
