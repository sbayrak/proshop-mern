import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    minHeight: '100vh',
  },
  gridContainer: {
    width: '45%',
    margin: '0 auto',
    marginTop: 100,
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  gridItem: {
    paddingBottom: 20,
  },

  lockBtn: {
    backgroundColor: '#212121',
    color: '#f9c11c',
    transition: '0.5s ease',
    '&:hover': {
      backgroundColor: '#212121',
      transform: 'scale(1.1)',
    },
  },
  SignInBtn: {
    backgroundColor: '#212121',
    color: '#f9c11c',
    '&:hover': {
      backgroundColor: '#212121',
    },
  },
  Typo1: {
    marginTop: 20,
    color: theme.palette.grey[700],
  },
  Typo1Link: {
    textDecoration: 'none',
    color: '#212121',
    borderBottom: '2px solid #f9c11c',
  },
}));

const RegisterScreen = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const [openMessage, setOpenMessage] = useState(true);

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Container maxWidth='lg' className={classes.rootContainer}>
          <form onSubmit={submitHandler}>
            <Grid container className={classes.gridContainer}>
              <Grid
                item
                xs={12}
                className={classes.gridItem}
                style={{ textAlign: 'center' }}
              >
                <IconButton className={classes.lockBtn}>
                  <ExitToAppIcon></ExitToAppIcon>
                </IconButton>

                {error && (
                  <Message
                    open={true}
                    variant='error'
                    message={error}
                  ></Message>
                )}
                {message && (
                  <Message
                    open={true}
                    variant='error'
                    message={message}
                  ></Message>
                )}
              </Grid>
              {loading ? (
                <CircularProgress></CircularProgress>
              ) : (
                <Fragment>
                  <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                      error={Boolean(error)}
                      label='Name'
                      // helperText='error message'
                      variant='outlined'
                      fullWidth
                      color='primary'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                      error={Boolean(error)}
                      label='E-Mail'
                      // helperText='error message'
                      variant='outlined'
                      fullWidth
                      color='primary'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                      error={Boolean(error)}
                      label='Password'
                      // helperText='error message'
                      variant='outlined'
                      fullWidth
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <TextField
                      error={Boolean(error)}
                      label='Confirm Password'
                      // helperText='error message'
                      variant='outlined'
                      fullWidth
                      type='password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <Button
                      variant='contained'
                      className={classes.SignInBtn}
                      fullWidth
                      type='submit'
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item xs={12} className={classes.gridItem}>
                    <Typography variant='subtitle2' className={classes.Typo1}>
                      Have an account?
                      <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        className={classes.Typo1Link}
                      >
                        Sign In
                      </Link>
                    </Typography>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </form>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
};

export default RegisterScreen;
