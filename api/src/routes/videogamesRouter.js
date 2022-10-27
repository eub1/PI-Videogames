const express = require("express");
const getVideogames = require('../controllers/getVideogames.js')

const router = express.Router();


// GET /videogames
// OBTENER UN LISTADO DE LOS VIDEOJUEGOS. Solo devolver los datos necesarios para la ruta principal

// GET /videogames/?name="..."  
// OBTENER UN LISTADO, de los 15 primeros videojuegos que contengan la palabra q viene por query. Mostrar mje acorde si no existe ninguno

// la ruta llamar al controlador, el controlador le deja todo listo para que la ruta haga res.send

router.get('/', (req, res) => {
  try {
    const {name} = req.query;
    if(name){
      res.send(`'Estas buscando al videogame ${name}`)
    } else {
      const videogames = getVideogames();
      console.log(videogames);
      res.send(videogames);
    }
  } catch (error) {
    res.send({error: error.message});
  }

});

// POST /videogames
// CREA UN VIDEOJUEGO en la base de datos, relacionado a sus generos
// recibe por body los datos recolectados desde el formulario (de la ruta de )
//json  {"nombre": "Tetris", "descripcion": "rompecabeza", "fecha": "16/10/2022", "rating": 5, "generos": "trivial", "plataformas": "varias"}
router.post('/', (req, res) => {
  console.log(req.body);
  const {nombre, descripcion, fecha, generos, plataformas} = req.body
  res.send(`Este es el videjuego creado en el form ${nombre} ${descripcion} ${fecha} ${generos} ${plataformas}`)
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