const express = require("express");
const createVideogame = require('../controllers/createVideogame.js');
const getAllVideogames = require('../controllers/getAllVideogames.js');
const getVideogamebyId = require('../controllers/getByIdVideogame.js')
const getByNameVideogames = require('../controllers/getByNameVideogames.js')

const { Videogame } = require("../db");

const router = express.Router();


// GET /videogames
// OBTENER UN LISTADO DE LOS VIDEOJUEGOS. Solo devolver los datos necesarios para la ruta principal

// GET /videogames/?name="..."  
// OBTENER UN LISTADO, de los 15 primeros videojuegos que contengan la palabra q viene por query. Mostrar mje acorde si no existe ninguno

// la ruta llamar al controlador, el controlador le deja todo listo para que la ruta haga res.send

router.get('/', async(req, res) => {
  try {
    const { name } = req.query;
    const { filter } = req.query;
    if(name){
      const byNameVideogames = await getByNameVideogames(name);
         // console.log("byNameVideogames", byNameVideogames.length, byNameVideogames);
      if(byNameVideogames.length) {
        return res.status(200).send(byNameVideogames)
      };
    };
    if(filter){
      const videogames = await getAllVideogames();
      return res.status(200).send(videogames);
    }
     else {
      const videogames = await getAllVideogames();
      // console.log("videogames",videogames);
      const concatVideogames = videogames[0].concat(videogames[1])
      return res.status(200).send(concatVideogames);
    }
  } catch (error) {
    res.send(error.message);
  }

});


// POST /videogames
// CREA UN VIDEOJUEGO en la base de datos, //! relacionado a sus generos
// recibe por body los datos recolectados desde el formulario (de la ruta de )

router.post('/', async (req, res) => {
  // console.log(req.body);
  const {name, description, released, rating, platforms, genres} = req.body
 
  try {

    if (!name || !description || !platforms) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }

    const createdVideogame = await createVideogame(name, description, released, rating, platforms, genres);
    console.log("createdVideogame en POST '/' ");
    res.status(201).send( createdVideogame );

  } catch (error) {
    console.log(`Error en ruta POST '/'. ${error.message}`);
    return res.status(404).send(error);
  }
});

// GET /videogame/{idVideogame}:
// OBTENER EL DETALLE DE UN VIDEOJUEGO particular. Solo traer los datos pedidos en la ruta de DETALLE de videojuego
// incluir los generos asociados


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