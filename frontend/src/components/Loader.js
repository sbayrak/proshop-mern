import React, { Fragment } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const Loader = () => {
  return (
    <Fragment>
      <Skeleton variant='rect' width={300} height={300}></Skeleton>
      <Skeleton variant='text' width={150}></Skeleton>
      <Skeleton variant='text' width={150}></Skeleton>
    </Fragment>
  );
};

export default Loader;
