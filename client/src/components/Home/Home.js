import s from './home.module.css';
import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getGenres, filterVideogamesByGenres, filterSource } from '../../redux/actions';
import {Link} from 'react-router-dom';
import VideogameCard from '../VideogameCard/VideogameCard';
import Pagination from '../Pagination/Pagination';


const Home = () => {

  const dispatch = useDispatch();
  //GLOBAL STATES
  const allVideogames = useSelector((state) => state.videogames) // mapStateToProps (trae todo lo que esta en el estado de videogames)
  const allGenres = useSelector((state) => state.genres)

  //LOCAL STATES
  //ORDEN
  // const [currentOrder, setOrder] = useState("Select order");
  // // SEARCH SOURCE
  // const[currentSource, setSource] = useState("All Sources");
  // //GENRE
  // const[currentGenre, setGenre] = useState("All Genres");

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1); // empieza en 1, porque siempre empiezo en la primer pagina
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
  
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    dispatch(getAllVideogames()); //component did mount, al montar, despacha esta accion
    dispatch(getGenres());
  },[dispatch]) // []  para que no se genere un loop infinito de llamados, si le paso algo, [algo], va a depender de que haya 'algo', para montarse

  function handleClick(e){ // para que no se bugguee, se resetea, y trae mas videojuegos
    e.preventDefault();
    dispatch(getAllVideogames());
  };

  // function handleOrder(e){
  //   console.log(e.target.value);
  //   setOrder(e.target.value);
  // };

  // function handleSource(e){
  //   console.log(e.target.value);
  //   setSource(e.target.value);
  // };
  // function handleFilterGenres(e){
  //   console.log(e.target.value);
  //   setGenre(e.target.value)
  //   dispatch(filterVideogamesByGenres(currentGenre, currentOrder, currentSource));
  // };
  function handleFilterGenres(e){
    dispatch(filterVideogamesByGenres(e.target.value));
  };

  function handleFilterSource(e){
    dispatch(filterSource(e.target.value))
  };

  return (
    <>
      <Link to='/videogames'>Create New Videogame</Link>
      <h1>PAGE TITLE: Im in Home</h1>
      <button onClick={e =>handleClick(e)}>Reload Videogames</button>
      <div>
        <div>
        <select>{/*  onChange = {e => handleOrder(e)} */}
          <option value="Select order" key="s"> Select order </option>
          <option value="Ascendent" key="a"> Ascendent </option>
          <option value="Descendent" key="d"> Descendent </option>
        </select>
        </div>
        <div>
        <select onChange={e => handleFilterSource(e)}> {/* onChange={e => handleSource(e)} */}
          <option value="All Sources" key="s">All Sources</option>
          <option value="Existent" key="a">Existent</option>
          <option value="Created" key="d">Created</option>
        </select>
        </div>
        <div>
        <select onChange={e => handleFilterGenres(e)}>
          { allGenres?.map(genre => {
              return (
                < option value={genre.name} key={Math.random()} >{genre.name}</option>
              )
            })
          }
          </select>
          </div>
        {/* <div>
        <select onChange={e => handleFilterGenres(e)}>
          < option value="All Genres" key={2} > Select Genre</option>
          { currentGenre === "All Genres" ? (
            allGenres?.map(genre => {
              return (
                < option value={genre.name} key={Math.random()+1} >{genre.name}</option>
              )
            })
          ) : 
          < option value={currentGenre} key={1} >{currentGenre}</option>
          }
          </select>
          </div> */}
        <Pagination
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
        />
        <div className = {s.vCard_container}>
        {
          currentVideogames?.map( videogame => {
            return (
              <div key={Math.random()} className={s.vCard}>
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