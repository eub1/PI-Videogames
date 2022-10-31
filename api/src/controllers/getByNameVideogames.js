const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');
const { Genre } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;


const getByNameApiVideogames = async (name) => {

  
    const fetchedData = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${RAWG_API_KEY}`);

    const matchedApiVideogames = []

    matchedApiVideogames.push( fetchedData.data.results.map((videogame) =>{
    return {
      id: videogame.id,
      name: videogame.name,
      image: videogame["background_image"],
      released: videogame.released,
      rating: videogame.rating,
      genre: videogame.genres?.map((genero) => genero.name)
    }
  }))
  matchedApiVideogames.flat();
  // console.log("matchedApiVideogames", matchedApiVideogames);

  return matchedApiVideogames;

};

const getByNameDbVideogames = async (name) => {
  const dbVideogames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const fetchedDBVideogames = dbVideogames?.map(videogame => {

    return {
      id: videogame.dataValues.id,
      name: videogame.dataValues.name,
      released: videogame.dataValues.released,
      rating: videogame.dataValues.rating,
      genre: videogame.dataValues.Genres?.map((genero) => genero.name) // undefined
    }
  })

  return  fetchedDBVideogames;
}

const getByNameVideogames = async(name) => {

  const promises = [ getByNameDbVideogames(name), getByNameApiVideogames(name)]
  const arrayOfMatchedVideogames = await Promise.all(promises)
  // console.log("arrayOfMatchedVideogames", arrayOfMatchedVideogames);
  const flattenedArray = arrayOfAllVideogames[0].concat(arrayOfAllVideogames[1])
  const get15FirstArray = [];
  for(let i=0; i <= 14; i++){
    get15FirstArray.push(flattenedArray[i])
  }

  if(get15FirstArray[0] !== null){
    return get15FirstArray;
  } else {
    throw new Error(`El ${name} no existe, puede crear uno nuevo en la sección de Crear Videojuego`);
  }; 
}

module.exports = getByNameVideogames;