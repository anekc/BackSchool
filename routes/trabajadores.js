/*
Ruta: /api/trabajadores
   */
const { Router } = require('express');

const { getTrabajador, addTrabajador } = require('../controllers/trabajadores');

const router = Router();


router.get('/', getTrabajador);


router.post('/', addTrabajador);


module.exports = router;