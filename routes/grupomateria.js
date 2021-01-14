/*
Ruta: /api/asignarprofesor
   */
const { Router } = require('express');
const { actualizarGrupoMateria, eliminargrupoMateria, addGrupoMateria } = require('../controllers/grupomateria');




const router = Router();


// router.get('/', getalumnoGrupo);


router.post('/', addGrupoMateria);

router.put('/:id', actualizarGrupoMateria);

router.delete('/:id', eliminargrupoMateria);

module.exports = router;