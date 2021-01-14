/*
Ruta: /api/materias
   */
const { Router } = require('express');



const { getMaterias, addMateria, actulizarMateria, eliminarMateria } = require('../controllers/materias');

const router = Router();


router.get('/', getMaterias);


router.post('/', addMateria);

router.put('/:id', actulizarMateria);
router.delete('/:id', eliminarMateria);

module.exports = router;