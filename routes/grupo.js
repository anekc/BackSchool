/*
Ruta: /api/grupo
   */
const { Router } = require('express');



const { addGrupo, actualizarGrupo, eliminarGrupo, getGrupo } = require('../controllers/grupo');

const router = Router();


router.get('/', getGrupo);


router.post('/', addGrupo);

router.put('/:id', actualizarGrupo);
router.delete('/:id', eliminarGrupo);

module.exports = router;