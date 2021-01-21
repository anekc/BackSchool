/*
Ruta: /api/alumnos
   */
const { Router } = require('express');

const { mejorpromedio } = require('../controllers/consultas');


const router = Router();


router.get('/', mejorpromedio);





module.exports = router;