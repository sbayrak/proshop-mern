import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

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
