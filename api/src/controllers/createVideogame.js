const axios = require('axios');
const { Videogame } = require('../db');
const { Genre } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;


const createVideogame = async (name, description, released, rating, platforms, genres) => {

  const newVideogame = await Videogame.create({name, description, released, rating, platforms});

  await newVideogame.addGenres(genres);
  console.log(newVideogame.dataValues, "soy el nuevo videojuego creado en controller createVideogame");
  return newVideogame.dataValues;

};


module.exports = createVideogame;