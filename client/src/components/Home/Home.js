import s from './Home.module.css';
import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getGenres, filterVideogamesByGenres, filterSource, orderByName, orderByRating } from '../../redux/actions';
import VideogameCard from '../VideogameCard/VideogameCard';
import Pagination from '../Pagination/Pagination';


const Home = () => {

  const dispatch = useDispatch();
  //GLOBAL STATES
  const videogames = useSelector((state) => state.videogames)
  const allGenres = useSelector((state) => state.genres)

  //LOCAL STATES
  //ORDEN
  const [order, setOrder] = useState("Select order");
  const [rating, setRating] = useState("Select order");

  //PAGINADO

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    let currentVideogames = [];
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    if(Array.isArray(videogames) && videogames.length > 0){
      currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    }

  useEffect(()=>{
    dispatch(getAllVideogames());
    dispatch(getGenres());
  },[dispatch]);

  function handleClick(e){ 
    e.preventDefault();
    dispatch(getAllVideogames());
  };

  function handleOrder(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); // al ordenar, seteame la pag en la primera.
    setOrder(e.target.value) // seteo este estado local, para que haga la modificacion del estado
  }
  
  function handleRatingOrder(e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setRating(e.target.value)
  }

  function handleFilterGenres(e){
    dispatch(filterVideogamesByGenres(e.target.value));
    setCurrentPage(1);
  };

  function handleFilterSource(e){
    dispatch(filterSource(e.target.value));
    setCurrentPage(1);
  };

 
  return (
    <div className={s.background_Home}>
      <h1>Choose a Videogame</h1>
      <div className={s.homeFilters}>
        <div>
        <select  onChange = {e => handleOrder(e)}>
          <option value="Select order" key="s"> Sort by name </option>
          <option value="Ascendent" key="a"> A-Z </option>
          <option value="Descendent" key="d"> Z-A </option>
        </select>
        </div>
        <div>
        <select  onChange = {e => handleRatingOrder(e)}>
          <option value="Select order" key="s"> Sort by rating </option>
          <option value="BestRated" key="a"> 0-5 </option>
          <option value="WorstRated" key="d"> 5-0 </option>
        </select>
        </div>
        <div>
        <select onChange={e => handleFilterSource(e)}>
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
        <button onClick={e =>handleClick(e)} id={s.reloadButton}>Reload Videogames</button>
        <div className={s.pages_container}>
          { Array.isArray(videogames) && videogames.length > 0 ?
            <Pagination
            videogamesPerPage={videogamesPerPage}
            videogames={videogames.length}
            paginado={paginado}
            /> 
          : null
          }
          {
            Array.isArray(videogames) && videogames.length === 0 ?
            <h2>No videogames found</h2>
            : null
          }
        </div>
        <div className = {s.vCard_container}>
        {
          Array.isArray(currentVideogames) && currentVideogames.length > 0 && currentVideogames?.map( videogame => {
            return (
                  <VideogameCard name= {videogame.name} image= {videogame.image} released= {videogame.released} rating= {videogame.rating} genre={videogame.genre} key={videogame.id} id={videogame.id}/>
            );
          })
        }
        </div>
      </div>
    </div>
  )

};


export default Home;


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