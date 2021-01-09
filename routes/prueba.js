/*
Ruta: /api/prueba
   */
const { Router } = require('express');

const { pruebaAlumnos, addPruebaAlumnos } = require('../controllers/pruebaselect');

const router = Router();


router.get('/', pruebaAlumnos);
router.post('/', addPruebaAlumnos);


module.exports = router;