const express = require("express");

const router = express.Router();


// GET /videogames
// OBTENER UN LISTADO DE LOS VIDEOJUEGOS. Solo devolver los datos necesarios para la ruta principal

// GET /videogames/?name="..."  
// OBTENER UN LISTADO, de los 15 primeros videojuegos que contengan la palabra q viene por query. Mostrar mje acorde si no existe ninguno

router.get('/', (req, res) => {
  res.send("probando la ruta /videogames")
});

// POST /videogames
// CREA UN VIDEOJUEGO en la base de datos, relacionado a sus generos
// recibe por body los datos recolectados desde el formulario (de la ruta de )
router.post('/', (req, res) => {
  console.log(req.body);
  const {detail} = req.body
  res.send(`Este es el videjuego creado en el form ${detail}`)
});

// GET /videogame/{idVideogame}:
// OBTENER EL DETALLE DE UN VIDEOJUEGO particular. Solo traer los datos pedidos en la ruta de DETALLE de videojuego
// incluir los generos asociados
router.get('/:id', (req, res) => {

  console.log(req.params);
  const {id} = req.params
  res.send(`Este es el videjuego con id: ${id}`)
});

module.exports = router;