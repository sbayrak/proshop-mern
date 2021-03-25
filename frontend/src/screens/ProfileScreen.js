import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
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

const ProfileScreen = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // dispatch(updateProfile)
    }
  };

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Container maxWidth='lg' className={classes.rootContainer}>
          <Grid container spacing={2}>
            <Grid item className={classes.gridContainer} md={4}>
              <form onSubmit={submitHandler}>
                <Grid
                  item
                  xs={12}
                  className={classes.gridItem}
                  style={{ textAlign: 'center' }}
                >
                  <Typography variant='h4'>User Profile </Typography>

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
                        Update
                      </Button>
                    </Grid>
                  </Fragment>
                )}{' '}
              </form>
            </Grid>
            {/* burdan asagi */}

            <Grid item className={classes.gridContainer} md={8}>
              <Grid
                item
                xs={12}
                className={classes.gridItem}
                style={{ textAlign: 'center' }}
              >
                <Typography variant='h4'>Orders</Typography>

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
                      Update
                    </Button>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
};

export default ProfileScreen;
