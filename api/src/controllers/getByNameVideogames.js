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
      genres: videogame.genres?.map((genero) => genero.name)
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
      genres: videogame.dataValues?.Genres?.map((genero) => genero.name) // undefined
    }
  })

  return  fetchedDBVideogames;
};

const getByNameVideogames = async(name) => {

  const promises = [ getByNameDbVideogames(name), getByNameApiVideogames(name)]
  const arrayOfMatchedVideogames = await Promise.all(promises)
  const flattenedArray =[]
  if(arrayOfMatchedVideogames[0].length > 0){
    return flattenedArray = arrayOfMatchedVideogames[0]?.concat(arrayOfMatchedVideogames[1][0])
  } else {
    if(arrayOfMatchedVideogames[1][0].length > 15){
      const get15FirstArray = [];
      for(let i=0; i <= 14; i++){
        get15FirstArray.push(arrayOfMatchedVideogames[1][0][i])
      }
      return get15FirstArray;
    }
    return arrayOfMatchedVideogames[1][0]
  };
};

module.exports = getByNameVideogames;