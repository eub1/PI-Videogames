const axios = require('axios');
const { Platform, Op } = require('../db');
require('dotenv').config();
const {
  RAWG_API_KEY
} = process.env;

 //Obtener todos los tipos de géneros de videojuegos posibles, si no lo encuentra, crearlo
const getAllPlatforms = async () => {

  const fetchedApiPlatforms = await axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`);
  const arrayOfPlatforms = [];
  fetchedApiPlatforms.data?.results?.map( (p) => arrayOfPlatforms.push(p.platforms))
  
  const arrayOfPlatforms2 = []
  arrayOfPlatforms.flat().map(p => arrayOfPlatforms2.push(p.platform.name))

  
  const platformsArray = [...new Set(arrayOfPlatforms2)].sort().map( p => 
    Platform.create({ where: {name: p}}))
  
 const arrayFoundCreatedPlatforms = await Promise.all(platformsArray);
 

  console.log("fetchedApiPlatforms", arrayFoundCreatedPlatforms);
  
  return arrayFoundCreatedPlatforms;

};


module.exports = getAllPlatforms;
