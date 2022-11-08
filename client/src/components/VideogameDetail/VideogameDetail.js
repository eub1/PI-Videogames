import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from '../../redux/actions'


const VideogameDetail = (props) => {
  console.log(props);
  const {id} = useParams();
  const videogame = useSelector((state) => state.videogameDetail);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getVideogameDetail(id))
  },[dispatch]);
  
  
  return(
     <div>
          <h1>{videogame["name"]}</h1>
          <img src={videogame["image"] && videogame["image"]} alt="" width="400px" heigth="350px"/>
          <h4>{videogame["description"]}</h4>
          <h3>Released date: {videogame["released"]}</h3>
          <h3>Rating: {videogame["rating"] && videogame["rating"]}</h3>
          <h3>Platforms: {videogame["platforms"]?.map(p => p + " ")}</h3>
          <h3>Genres: {videogame["genre"]?.map(g => g + " ")}</h3>
       <Link to='/home'>Home</Link>
    </div>
  )
}

export default VideogameDetail;