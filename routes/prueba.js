/*
Ruta: /api/prueba
   */
const { Router } = require('express');

const { pruebaAlumnos } = require('../controllers/pruebaselect');

const router = Router();


router.get('/', pruebaAlumnos);


module.exports = router;