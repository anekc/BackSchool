/*
Ruta: /api/alumnos
   */
const { Router } = require('express');

const { getAlumnos, addAlumno, actulizarAlumno, eliminarAlumno } = require('../controllers/alumnos');

const router = Router();


router.get('/', getAlumnos);


router.post('/', addAlumno);

router.put('/:id', actulizarAlumno);

router.delete('/:id', eliminarAlumno);


module.exports = router;