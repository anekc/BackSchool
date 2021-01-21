const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;



const mejorpromedio = async(req, res) => {

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
            `select nombre, apellido_pat, avg(calificacion) as promedio
            from alumno
            join alumnogrupo on id_alumnogrup = id_alumno
            join grupo on id_grupoalum = id_grupo
            join grupomateria on grupo.id_grupo = id_grupomat
            join materia on id_materiagrup = id_materia
            join calificacion on id_cal = mat_id_cal
            group by nombre, apellido_pat
            order by promedio desc
            fetch next 1 rows only`);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'MejorPromedio cargado correctamente',
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

    mejorpromedio
};