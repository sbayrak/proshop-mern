import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Link, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <TextField
        label='Search'
        onChange={(e) => setKeyword(e.target.value)}
        style={{ backgroundColor: '#fff' }}
      ></TextField>
      <Button variant='contained' type='submit'>
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
