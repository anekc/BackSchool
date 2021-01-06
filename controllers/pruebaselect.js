const oracledb = require('oracledb');

const dbConfig = require('../database/dbconfig');


const pruebaAlumnos = async(req, res) => {

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT NOMBRE, APELLIDO_MAT,EDAD
       FROM ALUMNO`
        );
        console.log(res.json({
            ok: true,
            msg: 'Alumnos cargados correctamente',
            result

        }));

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
};

module.exports = {
    pruebaAlumnos
};