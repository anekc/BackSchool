const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const getHistorial = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // ejecuta la funcion SQL
        const { nombre } = req.body;
        const result = await connection.execute(
            // consulta con filtro
            //     `select nombre, apellido_mat, edad
            // from alumno where nombre = :name`, ['Alejandro']);

            // consulta general
            `select nombre, apellido_mat, nombre_materia as materia, calificacion, numero_semestre as semestre
            from alumno
            join alumnogrupo on id_alumnogrup = id_alumno
            join grupo on id_grupoalum = id_grupo
            join grupomateria on grupo.id_grupo = id_grupomat
            join materia on id_materiagrup = id_materia
            join semestre on gr_id_semestre = id_semestre
            join calificacion on id_cal = mat_id_cal
            where nombre = :n`, [nombre]);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Historial cargado correctamente',
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

const materiaReprobada = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // ejecuta la funcion SQL
        const { nombre } = req.body;
        const result = await connection.execute(
            // consulta con filtro
            //     `select nombre, apellido_mat, edad
            // from alumno where nombre = :name`, ['Alejandro']);

            // consulta general
            `select nombre_materia, calificacion , count (id_alumno) as vecesReprobada
            from alumno
            join alumnogrupo on id_alumnogrup = id_alumno
            join grupo on id_grupoalum = id_grupo
            join grupomateria on grupo.id_grupo = id_grupomat
            join materia on id_materiagrup = id_materia
            join calificacion on id_cal = mat_id_cal
            where calificacion  < 5.99
            group by nombre_materia, calificacion
            order by calificacion asc
            fetch next 1 rows only`);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Historial cargado correctamente',
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
    getHistorial,
    materiaReprobada
};