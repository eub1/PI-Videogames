const axios = require('axios');
const { Videogame } = require('../db');
const { Genre } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;

//tags.description_raw
const getApiIdVideogame = async (id) => {
  
  const fetchedData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`);
  // console.log(fetchedData.data, "fetchedData");

  if(!fetchedData) { throw "No se ha encontrado el videojuego" };

  const foundVideogame = {
      id: fetchedData.data.id,
      name: fetchedData.data.name,
      image: fetchedData.data["background_image"],
      description: fetchedData.data.description_raw,
      released: fetchedData.data.released,
      rating: fetchedData.data.rating,
      platforms: fetchedData.data.platforms?.map( p => p.name),
      genre: fetchedData.data.genres?.map((genero) => genero.name)
    }
  
  // console.log(foundVideogame, "foundVideogame");

  return foundVideogame;

};

const getDbIdVideogame = async (id) => {
  const dbVideogame = await Videogame.findByPk(id, { 
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  // console.log(dbVideogame, "dbgames");

  return dbVideogame;
}

const getVideogamebyId = async(id) => {

  if(id.length > 35 ) { return getDbIdVideogame(id) }
  else
  return getApiIdVideogame(id);
}

module.exports = getVideogamebyId;



// const mySet = new Set()

//   let gotPlatformsName = apiVideogames.results.map((videogame) => {
//     return videogame.platforms
//   })
//     gotPlatformsName.flat().map((plataforma) => {

//     return mySet.add(plataforma.platform.name)
//   })
//   const platformsByName = [...mySet];

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

