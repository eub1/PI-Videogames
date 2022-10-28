const express = require("express");
const { Genre } = require("../db");

const router = express.Router();


// GET /genres
// OBTENER todos los TIPOS de GENEROS de videojuegos posibles
// Primero: traerlos desde rawg. Luego: guardarlos en nuestra DB para luego ya utilizarlos desde ahi

router.get('/', (req, res) => {
  res.send("probando la ruta /genres")
});

module.exports = router;