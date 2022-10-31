import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getGenres } from '../../redux/actions';
import {Link} from 'react-router-dom';
import VideogameCard from '../VideogameCard/VideogameCard'


const Home = () => {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames) // mapStateToProps (trae todo lo que esta en el estado de videogames)
  const allGenres = useSelector((state) => state.genres)


  useEffect(()=>{
    dispatch(getAllVideogames()); //component did mount, al montar, despacha esta accion
    dispatch(getGenres());
  },[]) // []  para que no se genere un loop infinito de llamados, si le paso algo, [algo], va a depender de que haya 'algo', para montarse

  function handleClick(e){ // para que no se bugguee, se resetea, y trae mas videojuegos
    e.preventDefault();
    dispatch(getAllVideogames());
  }

  return (
    <>
      <Link to='/videogames'>Create New Videogame</Link>
      <h1 key="title1">PAGE TITLE: Im in Home</h1>
      <button onClick={handleClick}>Reload Videogames</button>
      <div>
        <div>
        <select name="asc/desc" id="select1" key="select_asc/desc">
          <option value="asc" key="asc">Ascendent</option>
          <option value="desc"key="desc">Descendent</option>
        </select>
        </div>
        <div>
        <select name="exists/created" id="select2" key="select_exists/created">
          <option value="api">Existent</option>
          <option value="db">Created</option>
        </select>
        </div>
        <div>
        <select name="genres" id="select3" key="select_genres">
          {
            allGenres?.map(genre => {
              return (
                <option value={genre.id} key={genre.id}>{genre.name}</option>
              )
            })
          }
          </select>
          </div>
        <div>
        {
          allVideogames?.map( videogame => {
            return (
              <div>
                <Link to={/videogame/}>
                  <VideogameCard name= {videogame.name} image= {videogame.image} released= {videogame.released} rating= {videogame.rating} genre={videogame.genre} key={Math.random()} id={videogame.id}/>
                </Link>
              </div>
            );
          })
        }
        </div>
      </div>
    </>
  )

};


export default Home;

/* 
option: siempre necesita value, para que pueda acceder y preguntar despues.
 - dentro del select, tengo opciones(que tienen value).
  - ese value, es asc? => hace esto, si es desc? => hace esto

*/

/* 
         <option value="1">Action</option>
          <option value="2">Adventure</option>
          <option value="3">Arcade</option>
          <option value="4">Board Games</option>
          <option value="5">Card</option>
          <option value="6">Casual</option>
          <option value="9">Educational</option>
          <option value="11">Family</option>
          <option value="7">Fighting</option>
          <option value="8">Indie</option>
          <option value="10">Massively Multiplayer</option>
          <option value="12">Platformer</option>
          <option value="13">Puzzle</option>
          <option value="14">RPG</option>
          <option value="15">Racing</option>
          <option value="16">Shooter</option>
          <option value="17">Simulation</option>
          <option value="18">Sports</option>
          <option value="19">Strategy</option>

*/