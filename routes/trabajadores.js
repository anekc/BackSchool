/*
Ruta: /api/trabajadores
   */
const { Router } = require('express');

const { getTrabajador, addTrabajador, actualizarEmpleado, eliminarEmpleado } = require('../controllers/trabajadores');

const router = Router();


router.get('/', getTrabajador);


router.post('/', addTrabajador);

router.put('/:id', actualizarEmpleado);

router.delete('/:id', eliminarEmpleado);


module.exports = router;