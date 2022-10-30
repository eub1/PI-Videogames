const axios = require('axios');
const { Videogame } = require('../db');
const { Genre } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;


const createVideogame = async (name, description, released, rating, platforms, genres) => {

  const formVideogame = await Videogame.create({name, description, released, rating, platforms});

  const foundGenres = await Genre.findAll({
    where:{
      id: genres
    }
  })
 
  await formVideogame.addGenres(foundGenres);

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
  
  // console.log(newVideogame, "soy el nuevo videojuego creado en controller createVideogame");
  return newVideogame;

};


module.exports = createVideogame;