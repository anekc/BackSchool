/*
Ruta: /api/historial
   */
const { Router } = require('express');

const { getHistorial, materiaReprobada, mejorpromedio } = require('../controllers/historialAlumnos');

const router = Router();


router.post('/', getHistorial);
router.get('/', materiaReprobada);





module.exports = router;