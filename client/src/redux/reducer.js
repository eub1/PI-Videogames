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
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload, // [array de videojuegos]
        all_videogames: action.payload
      };
    case GET_BY_NAME_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload, // [array de videojuegos]
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
      // if(action.source === "Existent"){ allVideogames.filter( v => v.id.length < 15)};
      // if(action.source === "Created"){ allVideogames.filter( v => v.id.length > 15)};
      // if(action.value === "Ascendent"){
      //   allVideogames.sort(function(a,b) {
      //     if(a.name > b.name){ return 1; }
      //     if(a.name < b.name){ return -1; }
      //     return 0
      //   });
      // } else if(action.value === "Descendent"){
      //   allVideogames.sort(function(a,b) {
      //     if(a.name > b.name){ return -1; }
      //     if(a.name < b.name){ return 1; }
      //     return 0
      //   });
      // };
      const genresFiltered = (action.payload === "All Genres") ? allVideogames : allVideogames.filter( v => v.genre.includes(action.payload));
      // const uniqueGenresFiltered = [...new Set(genresFiltered)]
      // console.log(uniqueGenresFiltered);
      return {
        ...state,
        videogames:  genresFiltered,
      };
      case FILTER_BY_SOURCE:
        const all_Videogames = state.all_videogames;
        const sourceFiltered = action.payload === "Created" ? all_Videogames?.slice(100) : all_Videogames?.slice(0,100);
  
      return {
          ...state,
          videogames: action.payload === "All Sources" ? state.all_videogames : sourceFiltered
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
          }); // return 0, si son iguales, los deja igual
      return {
        ...state,
        videogames: sortedArray,
      };
      case ORDER_BY_RATING:
        let sortedRating = action.payload === "BestRated" ?
        state.videogames.sort(function(a,b) {
              if(a.name > b.name){ return 1; }
              if(a.name < b.name){ return -1; }
              return 0
            }) : 
        state.videogames.sort(function(a,b) {
              if(a.name > b.name){ return -1; }
              if(a.name < b.name){ return 1; }
              return 0
            }); // return 0, si son iguales, los deja igual
        return {
          ...state,
          videogames: sortedRating,
        };
    default:
      return { ...state };
  }
};



export default rootReducer;