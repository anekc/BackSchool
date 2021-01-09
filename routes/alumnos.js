/*
Ruta: /api/alumnos
   */
const { Router } = require('express');

const { getAlumnos, addAlumno } = require('../controllers/alumnos');

const router = Router();


router.get('/', getAlumnos);


router.post('/', addAlumno);


module.exports = router;