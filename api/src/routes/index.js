const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const diet = require('./diet')
const recipe = require('./recipe')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", diet)
router.use("/", recipe)

module.exports = router;