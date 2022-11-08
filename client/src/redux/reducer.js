import {GET_VIDEOGAMES, GET_BY_NAME_VIDEOGAMES,GET_GENRES, GET_PLATFORMS, GET_VIDEOGAME_DETAIL, CLEAN_DETAIL, FILTER_BY_GENRES, FILTER_BY_SOURCE, ORDER_BY_NAME, ORDER_BY_RATING} from './actions';

const initialState = {
  videogames: [],
  all_videogames: [],
  genres: [],
  videogameDetail: {},
  platforms: []
};

const rootReducer = (state = initialState, action) => {

  switch(action.type){
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        all_videogames: action.payload
      };
    case GET_BY_NAME_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      console.log("videogameDetail", action.payload);
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        videogameDetail: {},
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case FILTER_BY_GENRES:
      const allVideogames = state.all_videogames;
      const genresFiltered = (action.payload === "All Genres") ? allVideogames : allVideogames.filter( v => v.genre.includes(action.payload));

      return {
        ...state,
        videogames:  genresFiltered,
      };
      case FILTER_BY_SOURCE:
        const all_Videogames = state.all_videogames;
        const sourceFiltered = action.payload === "Created" ? all_Videogames.filter( v => v.createdInDb) : all_Videogames.filter( v => !v.createdInDb);
  
      return {
          ...state,
          videogames: sourceFiltered
      };
    case ORDER_BY_NAME:
      let sortedArray = action.payload === "Ascendent" ?
      state.videogames.sort(function(a,b) {
            if(a.name > b.name){ return 1; }
            if(a.name < b.name){ return -1; }
            return 0
          }) : 
      state.videogames.sort(function(a,b) {
            if(a.name > b.name){ return -1; }
            if(a.name < b.name){ return 1; }
            return 0
          });
      return {
        ...state,
        videogames: sortedArray,
      };
      case ORDER_BY_RATING:
        let sortedRating = action.payload === "BestRated" ?
        state.videogames.sort(function(a,b) {
              if(a.rating > b.rating){ return 1; }
              if(a.rating < b.rating){ return -1; }
              return 0
            }) : 
        state.videogames.sort(function(a,b) {
              if(a.rating > b.rating){ return -1; }
              if(a.rating < b.rating){ return 1; }
              return 0
            });
        return {
          ...state,
          videogames: sortedRating,
        };
    default:
      return { ...state };
  }
};



export default rootReducer;