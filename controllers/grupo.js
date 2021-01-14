const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//  función para obtener los alumnos desde la base de datos 

const getGrupo = async(req, res) => {

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
            `select grupo
            from grupo`);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'grupos disponibles cargados correctamente',
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


const addGrupo = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // variables sql y binds para ejecucion
        const { grupo, carrera, semestre, turno } = req.body;
        sql = `BEGIN
        agregarGrupo(:n,:c,:s,:t);
        END;`;
        binds = {
            n: grupo,
            c: carrera,
            s: semestre,
            t: turno
        };

        // ejecuta la funcion SQL
        const result = await connection.execute(sql, binds);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Grupo agregado correctamente',
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

const actualizarGrupo = async(req, res) => {

    let connection;
    const uid = req.params.id;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const { grupo, carrera, semestre, turno } = req.body;

        const result = await connection.execute(`UPDATE grupo
        SET grupo = :1,
        gr_id_carrera = :2,
        gr_id_semestre = :3,
        gr_id_turno = :4
        where id_grupo = :5`, [grupo, carrera, semestre, turno, uid], {
            autoCommit: true
        });
        res.json({
            ok: true,
            msg: `Grupo actualizado`,
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


const eliminarGrupo = async(req, res) => {
    let connection;

    const uid = req.params.id;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `delete from grupo where id_grupo =:id`, [uid], { autoCommit: true }

        );

        res.json({

            ok: true,
            msg: 'grupo eliminado correctamente ',
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
    getGrupo,
    addGrupo,
    actualizarGrupo,
    eliminarGrupo
};