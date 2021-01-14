/*
Ruta: /api/direccion
   */
const { Router } = require('express');


const { addDireccion, actualizarDireccion, eliminarDireccion } = require('../controllers/direccion');

const router = Router();


// router.get('/', getAlumnos);


router.post('/', addDireccion);

router.put('/:id', actualizarDireccion);

router.delete('/:id', eliminarDireccion);


module.exports = router;