const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//  función para obtener los alumnos desde la base de datos 

const getMaterias = async(req, res) => {

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
            `select nombre_materia
            from materia`);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Materias disponibles cargadas correctamente',
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


const addMateria = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // variables sql y binds para ejecucion
        const { nombre_materia, id_cal } = req.body;
        sql = `BEGIN
        agregarMateria(:n,:id_cal);
        END;`;
        binds = {
            n: nombre_materia,
            id_cal: id_cal
        };

        // ejecuta la funcion SQL
        const result = await connection.execute(sql, binds);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Alumno agregado correctamente',
            result



        }));

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: ` Error inesperado revisar logs `

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

const actulizarMateria = async(req, res) => {

    let connection;
    const uid = req.params.id;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const { nombre_materia, id_cal } = req.body;

        const result = await connection.execute(`UPDATE materia
        SET nombre_materia = :1,
        mat_id_cal = :2
        where id_materia = :3`, [nombre_materia, id_cal, uid], {
            autoCommit: true
        });
        res.json({
            ok: true,
            msg: `Materia actualizada`,
            uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `
                        Error inesperado revisar logs `
        });

    }

};


const eliminarMateria = async(req, res) => {
    let connection;

    const uid = req.params.id;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `delete from materia where id_materia =:id`, [uid], { autoCommit: true }

        );

        res.json({

            ok: true,
            msg: 'eliminado correctamente ',
            uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `
                    Error inesperado revisar logs `
        });

    }
};

// consulta SQL



module.exports = {
    getMaterias,
    addMateria,
    actulizarMateria,
    eliminarMateria
};