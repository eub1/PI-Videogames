const express = require("express");
const { Genre } = require("../db");
const getOrCreateGenres = require("../controllers/getOrCreateGenres");

const router = express.Router();


// GET /genres
// OBTENER todos los TIPOS de GENEROS de videojuegos posibles
// Primero: traerlos desde rawg. Luego: guardarlos en nuestra DB para luego ya utilizarlos desde ahi

router.get('/', async (req, res) => {
 try {
   const checkedGenres = await getOrCreateGenres()
   res.send(checkedGenres)
 } catch (error) {
  console.log("Error en la ruta '/genres con getOrCreateGenres");
  res.send(error.message)
 }
});

module.exports = router;