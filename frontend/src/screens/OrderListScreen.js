import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders } from '../actions/orderActions';
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

const OrderListScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

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
                      <TableCell align='right'>USER</TableCell>
                      <TableCell align='right'>DATE</TableCell>
                      <TableCell align='right'>TOTAL</TableCell>
                      <TableCell align='right'>PAID</TableCell>
                      <TableCell align='right'>DELIVERED</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell component='th'>{order._id}</TableCell>
                        <TableCell align='right'>
                          {order.user && order.user.name}
                        </TableCell>
                        <TableCell align='right'>
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell align='right'>{order.totalPrice}</TableCell>

                        <TableCell align='right'>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <CloseIcon style={{ color: 'red' }}></CloseIcon>
                          )}
                        </TableCell>
                        <TableCell align='right'>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <CloseIcon style={{ color: 'red' }}></CloseIcon>
                          )}
                        </TableCell>
                        <TableCell align='right'>
                          <Link to={`/order/${order._id}`}>
                            <IconButton>
                              <EditIcon></EditIcon>
                            </IconButton>
                          </Link>
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

export default OrderListScreen;
