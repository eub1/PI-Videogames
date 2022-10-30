import React from 'react';

 const VideogameCard = ({name, image, released, rating, genre}) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="img not found"/>
      <h6>{rating}</h6>
      <h6>{released}</h6>
      <h6>{genre}</h6>
    </div>
  )
};

export default VideogameCard;