/*
Ruta: /api/asignarprofesor
   */
const { Router } = require('express');
const { addGrupoProfesor, actualizarGrupoProfesor, eliminargrupoProfesor } = require('../controllers/grupoprofesor');



const router = Router();


// router.get('/', getalumnoGrupo);


router.post('/', addGrupoProfesor);

router.put('/:id', actualizarGrupoProfesor);

router.delete('/:id', eliminargrupoProfesor);

module.exports = router;