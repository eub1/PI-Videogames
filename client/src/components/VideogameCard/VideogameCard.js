import React from 'react';
import {Link} from 'react-router-dom';

 const VideogameCard = ({name, image, released, rating, genre, id}) => {
  return (
    <div>
      <Link to={`/videogame/${id}`}>
      <h3>{name}</h3>
      <img src={image} alt="img not found"/>
      <h6>{rating}</h6>
      <h6>{released}</h6>
      <h6>{genre}</h6>
      </Link>
    </div>
  )
};

export default VideogameCard;