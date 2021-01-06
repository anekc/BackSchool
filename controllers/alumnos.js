// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//  función para obtener los alumnos desde la base de datos 

const getAlumnos = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // ejecuta la funcion SQL
        const result = await connection.execute(
            // consulta con filtro
            //     `select nombre, apellido_mat, edad
            // from alumno where nombre = :name`, ['Alejandro']);

            // consulta general
            `select nombre, apellido_mat, edad
            from alumno`);
        // respuesta de la base de datos en formato json
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


const addAlumno = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // ejecuta la funcion SQL
        const result = await connection.execute(
            `INSERT INTO ALUMNO VALUES (:ID_ALUMNO, :NOMBRE,:APELLIDO_PAT, :APELLIDO_MAT,:EDAD,:CORREO_ELECTRONICO, :AL_ID_DIRECCION, :AL_ID_SEXO)`, [4, 'Andrea', 'Aguilar', 'Arteaga', 16, 'andrea@gmail.com', 6, 22], { autoCommit: true }
        );


        // console.log("Rows inserted: " + result.rowsAffected); // 1
        // console.log("ROWID of new row: " + result.lastRowid);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Alumno agregado correctamente',
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
    getAlumnos,
    addAlumno
};