const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// crear servidor
const app = express();
//CORS configurar
app.use(cors());
//base de datos
dbConnection();
//lectura y parseo del body
app.use(express.json());
// rutas
app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/prueba', require('./routes/prueba'));




app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});