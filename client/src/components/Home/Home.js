import s from './Home.module.css';
import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getGenres, filterVideogamesByGenres, filterSource, orderByName, orderByRating, setVideogamesToLoading } from '../../redux/actions';
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
    dispatch(setVideogamesToLoading());
    dispatch(getAllVideogames());
    dispatch(getGenres());
  },[dispatch]);

  function handleClick(e){ 
    e.preventDefault();
    dispatch(getAllVideogames());
    setTimeout(
      ()=>{ window.location.href="http://localhost:3000/home" },1000
      )
  };

  function handleSortByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); 
    setOrder(e.target.value) 
  }
  
  function handleSortByRating(e){
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
        <select  onChange = {handleSortByName}>
          <option value="Select order" key="s"> Sort by name </option>
          <option value="Ascendent" key="a"> A-Z </option>
          <option value="Descendent" key="d"> Z-A </option>
        </select>
        </div>
        <div>
        <select  onChange = {handleSortByRating}>
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
        <button onClick={e =>handleClick(e)} id={s.reloadButton}>Reset filters</button>
        <div className={s.pages_container}>
          {
            videogames?.loading && 
            <h2>Loading...</h2>
          }
          {
            videogames?.error &&
            <h2>{videogames.error}</h2>
          }
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


