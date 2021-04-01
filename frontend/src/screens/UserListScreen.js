import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers } from '../actions/userActions';
import {
  Container,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  rootContainer: {
    minHeight: '100vh',
  },
  gridContainer: {
    margin: '0 auto',
    marginTop: 100,
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));

const UserListScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history]);

  const deleteHandler = (userId) => {
    console.log('delete');
  };
  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.rootContainer}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={12}>
            {loading ? (
              <CircularProgress></CircularProgress>
            ) : error ? (
              <Message variant='error' message={error}></Message>
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align='right'>NAME</TableCell>
                      <TableCell align='right'>E-MAIL</TableCell>
                      <TableCell align='right'>ADMIN</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell component='th'>{user._id}</TableCell>
                        <TableCell align='right'>{user.name}</TableCell>
                        <TableCell align='right'>
                          <Link to={`mailto:${user.email}`}>{user.email}</Link>
                        </TableCell>
                        <TableCell align='right'>
                          {user.isAdmin ? (
                            <CheckIcon style={{ color: 'green' }}></CheckIcon>
                          ) : (
                            <CloseIcon style={{ color: 'red' }}></CloseIcon>
                          )}
                        </TableCell>

                        <TableCell align='right'>
                          <Link to={`/user/${user._id}/edit`}>
                            <IconButton>
                              <EditIcon></EditIcon>
                            </IconButton>
                          </Link>

                          <IconButton onClick={() => deleteHandler(user._id)}>
                            <DeleteIcon></DeleteIcon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default UserListScreen;
