import React, { Fragment } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    marginTop: theme.spacing(2),
  },
}));

const Message = ({ open, variant, message }) => {
  console.log(`open is ${open} variant is ${variant} message is ${message}`);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity={variant}>{message}</Alert>
    </div>
  );
};

//severity = variant
// error , warning , info , success

Message.defaultProps = {
  variant: 'info',
};

export default Message;
