import React from 'react';
import s from './pagination.module.css'

const Pagination = ({videogamesPerPage, videogames, paginado}) => {
  const pageNumber =[]
  const total = videogames && Math.ceil(videogames/videogamesPerPage);
  for(let i=1; i <= total; i++ ){
    pageNumber.push(i);
  }

  return (
    <nav className={s.pagination_main}>
      <ul className={s.pagination_ul}>
        {
          pageNumber?.map((number, index) =>(
            <li key={Math.random()} className='number'>
              <button onClick={()=>paginado(number)}>{number}</button>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Pagination;