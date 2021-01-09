/*
Ruta: /api/profesores
   */
const { Router } = require('express');

const { getProfesor, addProfesor } = require('../controllers/profesores');

const router = Router();


router.get('/', getProfesor);

router.post('/', addProfesor);




module.exports = router;