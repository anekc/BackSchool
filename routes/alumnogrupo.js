/*
Ruta: /api/alumnogrupo
   */
const { Router } = require('express');
const { getalumnoGrupo, addAlumnoGrupo, actualizarInscripcion, eliminarinscripcion } = require('../controllers/alumnogrupo');


const router = Router();


router.get('/', getalumnoGrupo);


router.post('/:id', addAlumnoGrupo);

router.put('/:id', actualizarInscripcion);

router.delete('/:id', eliminarinscripcion);

module.exports = router;