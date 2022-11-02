const axios = require('axios');
const { Videogame, Genre, Platform } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;


const createVideogame = async (name, description, released, rating, platforms, genres) => {

  const formVideogame = await Videogame.create({name, description, released, rating, platforms});

  //jointTable GENRES
  const foundGenres = await Genre.findAll({
    where:{
      id: genres
    }
  })
 
  await formVideogame.addGenres(foundGenres);

  //jointTable PLATFORMS
  const foundPlatforms = await Platform.findAll({
    where:{
      id: platforms
    }
  })
 
  await formVideogame.addPlatforms(foundPlatforms);

  const newVideogame = await Videogame.findOne({
    where: {
      name: name,
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
  
  console.log(newVideogame, "soy el nuevo videojuego creado en controller createVideogame");
  return newVideogame;

};


module.exports = createVideogame;