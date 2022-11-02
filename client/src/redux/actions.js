import axios from 'axios';
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME_VIDEOGAMES = "GET_BY_NAME_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";



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

export const filterVideogamesByGenres = (genreName, value) => {
  return {
      type: FILTER_BY_GENRES,
      payload: genreName,
      value
    }
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
