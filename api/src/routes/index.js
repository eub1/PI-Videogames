const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require('./videogamesRouter.js')
const genresRouter = require('./genresRouter.js')
const videogameIdRouter = require('./videogameIdRouter.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);
router.use('/videogame', videogameIdRouter);


// /home
router.get('/', (req, res) => {
  res.send("prueba de ruta get")
})


module.exports = router;
