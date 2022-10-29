const axios = require('axios');
const { Genre, Op } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;

 //Obtener todos los tipos de géneros de videojuegos posibles, si no lo encuentra, crearlo
const getOrCreateGenres = async () => {

  const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${RAWG_API_KEY}`);
  const setGenres = new Set()
  apiGenres.data?.results?.map( g => setGenres.add(g.name))

  const genresNames = [...setGenres].sort()
  console.log(Array.isArray(genresNames));
  // const newArray = []
  // let name = ""

  // for(let i = 0; i <= genresNames.length; i++)
  //  {
  //    name = genresNames[i]
  //   const [genre, created] = await Genre.findOrCreate({
  //     where: {name},
  //     defaults: {
  //       name
  //     }
  //   })

  //   if(!created) newArray.push(genre)
    
  //   }
 
  genresNames.forEach( genero => Genre.findOrCreate({where: genero}));

  let getGenres = await Genre.findAll()

  return getGenres;

};


module.exports = getOrCreateGenres;

/*
console.log(genresNames);
[
  'Action',                'Adventure',
  'Arcade',                'Board Games',
  'Card',                  'Casual',
  'Educational',           'Family',
  'Fighting',              'Indie',
  'Massively Multiplayer', 'Platformer',
  'Puzzle',                'RPG',
  'Racing',                'Shooter',
  'Simulation',            'Sports',
  'Strategy'
]
 */