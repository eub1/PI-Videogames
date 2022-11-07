import React from 'react';
import {Link} from 'react-router-dom';
import s from './videogameCard.module.css'

 const VideogameCard = (props) => {
  // {name, image, released, rating, genre, id}
  return (
    <div className={s.videogameCard_main}>
      <Link to={`/videogame/${props.id}`}>
      <h3>{props.name}</h3>
      <img src={props.image} alt="img not found" width="350px" height="200px"/>
      <ul className={s.videogameCard_ul}>
      {props.genre?.map(genero => <li key={genero}>{genero}</li>)}
      </ul>
      </Link>
    </div>
  )
};

export default VideogameCard;