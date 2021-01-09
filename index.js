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
app.use('/api/historial', require('./routes/historialalumnos'));
app.use('/api/profesores', require('./routes/profesores'));
app.use('/api/empleados', require('./routes/trabajadores'));
app.use('/api/prueba', require('./routes/prueba'));




app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});