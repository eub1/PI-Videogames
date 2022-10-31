import {GET_VIDEOGAMES, GET_BY_NAME_VIDEOGAMES,GET_GENRES, GET_VIDEOGAME_DETAIL, CLEAN_DETAIL} from './actions';

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
}



export default rootReducer;