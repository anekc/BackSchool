/*
Ruta: /api/profesores
   */
const { Router } = require('express');


const { getProfesor, addProfesor, actulizarProfesor, eliminarProfesor } = require('../controllers/profesores');

const router = Router();


router.get('/', getProfesor);

router.post('/', addProfesor);

router.put('/:id', actulizarProfesor);

router.delete('/:id', eliminarProfesor);





module.exports = router;