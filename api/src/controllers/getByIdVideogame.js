const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');

require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;

//tags.description_raw
const getApiIdVideogame = async (id) => {
  
  const fetchedData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`);
  // console.log("fetchedData", fetchedData.data );

  if(!fetchedData) { throw "No se ha encontrado el videojuego" };

  const foundVideogame = {
      id: fetchedData.data.id,
      name: fetchedData.data.name,
      image: fetchedData.data["background_image"],
      description: fetchedData.data.description_raw,
      released: fetchedData.data.released,
      rating: fetchedData.data.rating,
      platforms: fetchedData.data.platforms?.map( p => p.platform).map(p => p.name),
      genre: fetchedData.data.genres?.map((genero) => genero.name)
    }
  
// console.log("foundVideogame", foundVideogame);

  return foundVideogame;

};

const getDbIdVideogame = async (id) => {
  const dbVideogame = await Videogame.findByPk(id, { 
    include: {
      model: Platform,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
 

   const genreArray = dbVideogame.dataValues?.Genres?.map( g => g.name)
   console.log("genreArray", genreArray);
   const formatDbVideogame = {...dbVideogame.dataValues, genre: genreArray};
   delete formatDbVideogame.Genres;
  //dbVideogame.Videogame?.dataValues?.map(el => {
  //   return {
  //     id: el.id,
  //     name: el.name,
  //     released: el.released,
  //     rating: el.rating,
  //     platforms: el.Platforms?.map((p) => p.name),
  //     genre: el.Genres?.map((genero) => genero.name)
  //   }
  // })
// console.log(dbVideogame.dataValues, "keys dbVideogame");
console.log(formatDbVideogame, "formatDbVideogame GET BY ID");

  return formatDbVideogame;
}

const getVideogamebyId = async(id) => {

  if(id.length > 35 ) { return getDbIdVideogame(id) }
  else
  return getApiIdVideogame(id);
}

module.exports = getVideogamebyId;


//   const formatApiVideogames = apiVideogames.results.map((videogame) => {
//     return {
//       id: videogame.id,
//       name: videogame.name,
//       description: videogame["description"],
//       released: videogame.released,
//       rating: videogame.rating,
//       platforms: platformsByName,
//       genre: videogame.genres.map((genero) => genero.name)
//     }
//   });

