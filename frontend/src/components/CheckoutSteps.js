import React, { Fragment } from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  primary: {
    main: '#f9c11c',
  },
});

const useStyles = makeStyles((theme) => ({
  crumbContainer: {
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Link1: {
    color: theme.palette.grey[900],
    textDecoration: 'none',
    borderBottom: '1px solid #f9c11c',
  },
  Link2: {
    color: theme.palette.grey[400],
    textDecoration: 'none',
    borderBottom: '1px solid #f9c11c',
  },
}));

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Breadcrumbs className={classes.crumbContainer}>
          {step1 ? (
            <Link className={classes.Link1}>Sign In</Link>
          ) : (
            <Link className={classes.Link2}>Sign In</Link>
          )}

          {step2 ? (
            <Link className={classes.Link1}>Shipping</Link>
          ) : (
            <Link className={classes.Link2}>Shipping</Link>
          )}
          {step3 ? (
            <Link className={classes.Link1}>Payment</Link>
          ) : (
            <Link className={classes.Link2}>Payment</Link>
          )}
          {step4 ? (
            <Link className={classes.Link1}>Place Order</Link>
          ) : (
            <Link className={classes.Link2}>Place Order</Link>
          )}
        </Breadcrumbs>
      </ThemeProvider>
    </Fragment>
  );
};

export default CheckoutSteps;
