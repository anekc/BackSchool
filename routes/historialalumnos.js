/*
Ruta: /api/historial
   */
const { Router } = require('express');

const { getHistorial } = require('../controllers/historialAlumnos');

const router = Router();


router.get('/', getHistorial);





module.exports = router;