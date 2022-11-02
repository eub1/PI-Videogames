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
       if(action.value === "Ascendent"){
        allVideogames.sort(function(a,b) {
          if(a.name > b.name){ return 1; }
          if(a.name < b.name){ return -1; }
          return 0
        });
      } else if(action.value === "Descendent"){
        allVideogames.sort(function(a,b) {
          if(a.name > b.name){ return -1; }
          if(a.name < b.name){ return 1; }
          return 0
        });
      };
      const genresFiltered = (action.payload === "All Genres") ? allVideogames : allVideogames.filter( v => v.genre.includes(action.payload));

      return {
        ...state,
        videogames: genresFiltered,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: genresFiltered,
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