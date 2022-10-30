const express = require("express");
const getVideogamebyId = require('../controllers/getByIdVideogame.js')


const router = express.Router();
// /videogame/:id

router.get('/:id', async (req, res) => {

  try {
    // console.log(req.params);
    const {id} = req.params
    if(!id){ throw new Error(`Debe indicar un id para poder encontrar el Videojuego`)}
    const videogameById = await  getVideogamebyId(id)
    res.status(200).send(videogameById)
    
  } catch (error) {
    res.send(error.message)
  }
  });
  
  module.exports = router;