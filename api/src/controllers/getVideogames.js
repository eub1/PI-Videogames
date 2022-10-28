const axios = require('axios');
const { Videogame } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;


const getVideogames = async () => {

  const fetchData = await axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`);
  const apiVideogames = fetchData.data;
  const platformsByName = [];
  let getPlatformsName = apiVideogames.results.map((videogame) => {
    return videogame.platforms
  })
  getPlatformsName.flat().map((plataforma) => {
    return platformsByName.push(plataforma.platform.name)
  })

  const formatApiVideogames = apiVideogames.results.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      released: videogame.released,
      rating: videogame.rating,
      platforms: platformsByName,
      genre: videogame.genre
    }
  });

   // throw Error("")

  // const dbVideogames = await Videogame.findAll();
  return formatApiVideogames;

};


module.exports = getVideogames;