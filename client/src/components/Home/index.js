import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import {Link} from 'react-router-dom';

export default function Home() {

  const dispatch = useDispatch;
  const allVideogames = useSelector((state) => state.videogames) // mapStateToProps (trae todo lo que esta en el estado de videogames)

  useEffect(()=>{
    dispatch(getVideogames()) //component did mount, al montar, despacha esta accion
  },[]) // []  para que no se genere un loop infinito de llamados, si le paso algo, [algo], va a depender de que haya 'algo', para montarse

  function handleClick(e){ // para que no se bugguee, se resetea, y trae mas videojuegos
    e.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <>
      <Link to='/videogames'>Crear Videojuego</Link>
      <h1>TITULO DE LA PAGINA</h1>
      <button onClick={e=>{handleClick(e)}}>Reload Videogames</button>
      <div>
        <select name="asc/desc" id="">
          <option value="">Ascendente</option>
          <option value="">Descendente</option>
        </select>
        <select name="videogames" id="">
          <option value="">Existente</option>
          <option value="">Creado por este Usuario</option>
        </select>
        <select name="genres" id="">
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
        </select>
      </div>
    </>
  )

};

/* 
option: siempre necesita value, para que pueda acceder y preguntar despues.
 - dentro del select, tengo opciones(que tienen value).
  - ese value, es asc? => hace esto, si es desc? => hace esto

*/