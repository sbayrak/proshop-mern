import React, { Fragment } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridProduct: {
    padding: theme.spacing(1.5),
  },
  cardDesc: {
    minHeight: 230,
  },
  bottomCardAction: {
    display: 'flex',
    flexDirection: 'column',
  },
  Typo1: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();
  console.log(product);

  return (
    <Fragment>
      <Grid item xs={12} sm={6} md={3} className={classes.gridProduct}>
        <Card>
          <Link
            href={`/product/${product._id}`}
            style={{ textDecoration: 'none' }}
          >
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
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  style={{ fontSize: '14px' }}
                >
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions className={classes.bottomCardAction}>
            <Typography
              variant='subtitle2'
              gutterBottom
              paragraph
              className={classes.Typo1}
            >
              <Rating
                name='half-rating-read'
                defaultValue={product.rating}
                precision={0.5}
                readOnly
                size='small'
              />
              {product.numReviews} reviews
            </Typography>
            <Typography variant='h6'> ${product.price}</Typography>
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default Product;
