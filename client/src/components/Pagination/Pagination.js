import React from 'react';

const Pagination = ({videogamesPerPage, allVideogames, paginado}) => {
  const pageNumber =[]
  for(let i=0; i <= Math.ceil(allVideogames/videogamesPerPage); i++ ){
    pageNumber.push(i+1);
  }

  return (
    <nav >
      <ul className='paginado'>
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