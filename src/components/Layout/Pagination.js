import classes from './Pagination.module.css';

function Pagination({ totalPastes, pastePerPage, paginationHandler }) {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalPastes / pastePerPage); index++) {
    pageNumbers.push(index);
  }

  return (
    <nav>
      <ul className={classes['pagination-list']}>
        {pageNumbers.map((page) => {
          return (
            <li
              className={classes['pagination-list__element']}
              key={page + Math.random()}
              onClick={paginationHandler}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;
