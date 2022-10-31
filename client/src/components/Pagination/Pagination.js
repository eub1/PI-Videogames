import React from 'react';

const Pagination = ({videogamesPerPage, allVideogames, paginado}) => {
  const pageNumber =[]
  for(let i=0; i <= Math.ceil(allVideogames/videogamesPerPage); i++ ){
    pageNumber.push(i+1);
  }
  return (
    <nav>
      <ul className='paginado'>
        {
          pageNumber?.map(number =>(
            <li key={Math.random()} className='number'>
              <a onClick={()=>paginado(number)}>{number}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Pagination;