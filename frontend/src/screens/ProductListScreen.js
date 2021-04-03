import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
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
  Button,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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

const ProductListScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productList);
  const { loading, error, products } = productsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (userId) => {
    // delete products
  };

  const createProductHandler = () => {
    console.log('Hi');
  };
  return (
    <Fragment>
      <Container maxWidth='lg' className={classes.rootContainer}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={12}>
            <Button onClick={createProductHandler} variant='contained'>
              <AddCircleIcon></AddCircleIcon>&nbsp;Create Product
            </Button>
            <Typography gutterBottom></Typography>
          </Grid>
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
                      <TableCell align='right'>PRICE</TableCell>
                      <TableCell align='right'>CATEGORY</TableCell>
                      <TableCell align='right'>BRAND</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell component='th'>{product._id}</TableCell>
                        <TableCell align='right'>{product.name}</TableCell>
                        <TableCell align='right'>
                          <Link to={`mailto:${product.price}`}>
                            {product.price}
                          </Link>
                        </TableCell>
                        <TableCell align='right'>{product.category}</TableCell>
                        <TableCell align='right'>{product.brand}</TableCell>

                        <TableCell align='right'>
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <IconButton>
                              <EditIcon></EditIcon>
                            </IconButton>
                          </Link>

                          <IconButton
                            style={{ color: 'red' }}
                            onClick={() => deleteHandler(product._id)}
                          >
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

export default ProductListScreen;
