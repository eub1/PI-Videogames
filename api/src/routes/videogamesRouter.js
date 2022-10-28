const express = require("express");
const getVideogames = require('../controllers/getVideogames.js');
const { Videogame } = require("../db");

const router = express.Router();


// GET /videogames
// OBTENER UN LISTADO DE LOS VIDEOJUEGOS. Solo devolver los datos necesarios para la ruta principal

// GET /videogames/?name="..."  
// OBTENER UN LISTADO, de los 15 primeros videojuegos que contengan la palabra q viene por query. Mostrar mje acorde si no existe ninguno

// la ruta llamar al controlador, el controlador le deja todo listo para que la ruta haga res.send

router.get('/', async(req, res) => {
  try {
    const {name} = req.query;
    if(name){
      res.send(`'Estas buscando al videogame ${name}`)
    } else {
      const videogames = await getVideogames();
      console.log(videogames);
      res.send(videogames);
    }
  } catch (error) {
    res.send(error.message);
  }

});

/* 
videogames:
[ { key: 3498 }, { key: 3328 }, { key: 4200 }, { key: 5286 }, { key: 4291 }, { key: 5679 }, { key: 12020 }, { key: 13536 }, { key: 4062 }, { key: 3439 }, { key: 802 }, { key: 28 }, { key: 13537 }, { key: 4286 }, { key: 1030 }, { key: 2454 }, { key: 3070 }, { key: 32 }, { key: 58175 }, { key: 11859 } ]
*/

// POST /videogames
// CREA UN VIDEOJUEGO en la base de datos, //! relacionado a sus generos
// recibe por body los datos recolectados desde el formulario (de la ruta de )

router.post('/', async (req, res) => {
  // console.log(req.body);
  const {name, description, released, rating} = req.body
 
  try {

    if (!name || !description) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }

    const newVideogame = await Videogame.create({name, description});
    res.status(200).send(newVideogame);

  } catch (error) {
    console.log(`Error en ruta POST '/'. ${error.message}`);
    return res.status(404).send(error);
  }
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