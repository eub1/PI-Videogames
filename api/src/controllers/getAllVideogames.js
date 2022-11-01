const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');

require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;


const getApiVideogames = async () => {

  const api100 = [];
  for ( let i = 0; i < 5 ; i++ ) {
    const fetchedData = await axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`);

    api100.push( fetchedData.data.results.map((videogame) =>{
    return {
      id: videogame.id,
      name: videogame.name,
      image: videogame["background_image"],
      released: videogame.released,
      rating: videogame.rating,
      platforms: videogame.platforms?.map( p => p.platform?.name),
      genre: videogame.genres?.map((genero) => genero.name)
    }
  }));
  };
  const apiVideogames = api100.flat()

  return apiVideogames;

};

const getDbVideogames = async () => {
  const dbVideogames = await Videogame.findAll({
    // attributes: ['id', 'name', 'released', 'rating'],
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
      }
    }
  });

  // console.log("dbVideogames", dbVideogames);
  const fetchedDBVideogames = dbVideogames?.map(el => {
    return {
      id: el.id,
      name: el.name,
      released: el.released,
      rating: el.rating,
      platforms: el.Platforms?.map((p) => p.name),
      genre: el.Genres?.map((genero) => genero.name)
    }
  })

  // console.log(fetchedDBVideogames, "dbgames");

  return fetchedDBVideogames;
}

const getAllVideogames = async() => {

  const promisesAllVideogames = [getApiVideogames(), getDbVideogames()];
  const arrayOfAllVideogames = await Promise.all(promisesAllVideogames);

    return arrayOfAllVideogames;

}

module.exports = getAllVideogames;