const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//  función para obtener los alumnos desde la base de datos 

const getProfesor = async(req, res) => {

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
            `select id_profesor, nombre, apellido_mat, edad
            from profesor`);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Profesores cargados correctamente',
            result

        }));

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: `Error en la operacion ${err}`
        });
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


const addProfesor = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // variables sql y binds para ejecucion
        const { name, lastname, surname, age, id_dir, id_sex } = req.body;
        // ejecuta la funcion SQL
        const result = await connection.execute(`
        BEGIN
        agregarProfesor(:n,:ln,:sn,:age,:dir, :sex);
        END;`, {
            n: name,
            ln: lastname,
            sn: surname,
            age: age,
            dir: id_dir,
            sex: id_sex
        });
        console.log(res.json({
            ok: true,
            msg: 'Profesor agregado correctamente',
            result

        }));

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: `Profesor duplicado ${err}`

        });
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
    getProfesor,
    addProfesor
};