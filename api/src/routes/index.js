const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require('./videogames.js')
const genresRouter = require('./genres.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);


// /home
router.get('/', (req, res) => {
  res.send("prueba de ruta get")
})


module.exports = router;
