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

console.log(process.env);

//rutas 
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola a todos'
    });

});
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});