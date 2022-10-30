import axios from 'axios';
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";




export const getVideogames = () =>{
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

export const getGenres = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/genres");
    const genres = apiData.data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

export const getVideogameDetail = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((resp) => dispatch({ type: GET_VIDEOGAME_DETAIL, payload: resp.data }))
      .catch((error) => console.log(error));
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};
