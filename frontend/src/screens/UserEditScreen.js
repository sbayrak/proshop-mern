import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import {
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Checkbox,
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

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    console.log('hi from submitHandler');
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
              </Grid>
              {loadingUpdate && <CircularProgress></CircularProgress>}
              {errorUpdate && (
                <Message variant='error' message={errorUpdate}></Message>
              )}
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                          name='checkedA'
                        />
                      }
                      label='Is Admin'
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
          </form>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
};

export default UserEditScreen;
