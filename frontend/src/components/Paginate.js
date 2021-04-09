import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  console.log(pages);
  console.log(page);
  return (
    pages > 1 && (
      <Pagination
        count={pages}
        page={page}
        renderItem={() =>
          [...Array(pages).keys()].map((x) => (
            <PaginationItem
              component={Link}
              to={`/page/${x + 1}`}
            ></PaginationItem>
          ))
        }
        variant='outlined'
        shape='rounded'
      ></Pagination>
    )
  );
};

export default Paginate;
