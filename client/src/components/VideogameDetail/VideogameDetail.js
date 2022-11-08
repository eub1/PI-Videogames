import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, cleanDetail } from '../../redux/actions';
import s from './videogameDetail.module.css'


const VideogameDetail = (props) => {
  console.log(props);
  const {id} = useParams();
  const idVideogame = useSelector((state) => state.videogameDetail);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getVideogameDetail(id))
    return ()=>{
      dispatch(cleanDetail())
  }
  },[dispatch]);
  
  
  return(
     <div className={s.detail_Main}>
      <div className={s.detail_Container}>
          <h1>{idVideogame["name"]}</h1>
          <img src={idVideogame["image"] && idVideogame["image"]} alt="" width="400px" heigth="350px"/>
          <h4>{idVideogame["description"]}</h4>
          <h3>Released date: {idVideogame["released"]}</h3>
          <h3>Rating: {idVideogame["rating"] && idVideogame["rating"]}</h3>
          <h3>Platforms: {idVideogame["platforms"]?.map(p => p + " ")}</h3>
          <h3>Genres: {idVideogame["genre"]?.map(g => g + " ")}</h3>
      </div>
       <Link to='/home'><button id="detail_button">Home</button></Link>
    </div>
  )
}

export default VideogameDetail;