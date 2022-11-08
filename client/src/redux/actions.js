import axios from 'axios';
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME_VIDEOGAMES = "GET_BY_NAME_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";

//* ------------------------------------------ VIDEOGAMES ------------------------------------------

export const getAllVideogames = () =>{
  return function (dispatch){
    axios
    .get("http://localhost:3001/videogames")
    .then((response) => {
      return response.data;
    })
    .then((data) => dispatch({ type: GET_VIDEOGAMES, payload: data }))
    .catch((error) => console.log(error));
  };
};
export const getByNameVideogames = (name) =>{
  return function (dispatch){
    axios
    .get(`http://localhost:3001/videogames?name=${name}`)
    .then((response) => {
      return response.data;
    })
    .then((data) => dispatch({ type: GET_BY_NAME_VIDEOGAMES, payload: data }))
    .catch((error) => console.log(error));
  };
};

export const getVideogameDetail = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogame/${id}`)
      .then((resp) => dispatch({ type: GET_VIDEOGAME_DETAIL, payload: resp.data }))
      .catch((error) => console.log(error));
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

//* ------------------------------------------ GET GENRES & PLATFORMS ------------------------------------------

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/genres");
      const genres = apiData.data;
      dispatch( { type: GET_GENRES, payload: [ { id: 0, name: "All Genres" }, ...genres ] } );
    } catch (error) {
      console.log(error)
    }
  };
};


export const getPlatforms = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/platforms");
      const platforms = apiData.data;
      dispatch( { type: GET_PLATFORMS, payload: [ { id: 0, name: "All Platforms" }, ...platforms ] } );
    } catch (error) {
      console.log(error)
    }
  };
};

//* ------------------------------------------ FILTROS Y ORDENAMIENTO ------------------------------------------

export const filterVideogamesByGenres = (genreName) => {
  return {
      type: FILTER_BY_GENRES,
      payload: genreName
    }
};

export const filterSource = (payload)=>{
  return {
    type: FILTER_BY_SOURCE,
    payload
}};

export const orderByName = (payload)=>{
  return {
    type: ORDER_BY_NAME,
    payload
}};

export const orderByRating = (payload)=>{
  return {
    type: ORDER_BY_RATING,
    payload
}};

