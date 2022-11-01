import {GET_VIDEOGAMES, GET_BY_NAME_VIDEOGAMES,GET_GENRES, GET_VIDEOGAME_DETAIL, CLEAN_DETAIL, FILTER_BY_GENRES} from './actions';

const initialState = {
  videogames: [],
  genres: [],
  videogameDetail: {}
};

const rootReducer = (state = initialState, action) => {

  switch(action.type){
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload, // [array de videojuegos]
      };
    case GET_BY_NAME_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload, // [array de videojuegos]
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_BY_GENRES:
      const allVideogames = state.videogames;
      // const accessedGenres = allVideogames.map( v => v.genre);
      const genresFiltered = (action.payload === "All Genres") ? allVideogames : allVideogames.filter((v, index) => { return v.genre?[index] === action.payload});
      // const filteredVideogames = []
      // const array = allVideogames.map(v => Object.values(v.genre)?.includes(action.payload) ? filteredVideogames.push(v) : 0);
      return {
        ...state,
        videogames: genresFiltered,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        videogameDetail: {},
      };
    default:
      return { ...state };
  }
};



export default rootReducer;