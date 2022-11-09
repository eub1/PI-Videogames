import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, cleanDetail } from '../../redux/actions';
import s from './videogameDetail.module.css'
import loading from '../../assets/200w.gif'


const VideogameDetail = (props) => {

  const {id} = useParams();

  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getVideogameDetail(id))
    return ()=>{
      dispatch(cleanDetail())
  }
  },[dispatch]);

  const idVideogame = useSelector((state) => state.videogameDetail);
  if(idVideogame.description){
  return (
     <div className={s.detail_Main}>
      <div className={s.hidden}></div>
      <div className={s.detail_Container}>
          <h1>{idVideogame["name"]}</h1>
          <img src={idVideogame["image"] && idVideogame["image"]} alt="" width="400px" heigth="350px"/>
          <h4>{idVideogame["description"]}</h4>
        <div className={s.row}>
          <h3>Released date: {idVideogame["released"]}</h3>
          <h3>Rating: {idVideogame["rating"] && idVideogame["rating"]}</h3>
        </div>
          <h3>Platforms: <ul>{
          idVideogame["platforms"]?.map(p => (
          <li>{p}</li>
          ))
          }</ul>
          </h3>
          <h3>Genres: <ul>{
          idVideogame["genre"]?.map(g => (
          <li>{g}</li>
          ))
          }</ul>
          </h3>
       </div>
       <Link to='/home'><button id="detail_button">Home</button></Link>
    </div>
  )
} else {
  return (
    <div className={s.loading}>
      <h2>Loading...</h2>
      <img src={loading} alt=""/>
    </div>
    )
}

};


export default VideogameDetail;