import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from '../../redux/actions'
// import Logo from '../../../../videogame.png'

const VideogameDetail = (props) => {
  console.log(props);
  const {id} = useParams();

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getVideogameDetail(id))
  },[dispatch]);
  
  const idVideogame = useSelector((state) => state.videogameDetail); // toma el estado global del reducer
  return(
     <div>
          <h1>{idVideogame["name"]}</h1>
          <img src={idVideogame["image"] && idVideogame["image"]} alt="" width="500px" heigth="700px"/>
          <h4>{idVideogame["description"]}</h4>
          <h3>Released date: {idVideogame["released"]}</h3>
          <h3>Rating: {idVideogame["rating"]}</h3>
          <h3>Platforms: {idVideogame["platforms"]?.map(p => p + " ")}</h3>
          <h3>Genres: {idVideogame["genre"]?.map(g => g + " ")}</h3>
       <Link to='/home'>Home</Link>
    </div>
  )
}

export default VideogameDetail;