const axios = require('axios');
const { Videogame } = require('../db');
const { Genre } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;


const getVideogamesByName = async (game) => {

  const fetchedData = await axios.get(`https://api.rawg.io/api/games?search=${game}&key=${RAWG_API_KEY}`);
  const apiVideogames = fetchedData.data;

  const formatApiVideogames = apiVideogames.results.map((videogame) => {
    return {
      name: videogame.name,
      image: videogame["background_image"],
      released: videogame.released,
      rating: videogame.rating,
      genre: videogame.genres.map((genero) => genero.name)
    }
  });
  

   // throw Error("")

   const dbVideogames = await Videogame.findAll();

  return [...dbVideogames, ...formatApiVideogames];

};


module.exports = getVideogamesByName;