const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//  función para obtener los alumnos desde la base de datos 

const getalumnoGrupo = async(req, res) => {

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
            `select id_alumnogrup
            from alumnogrupo`);
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


const addAlumnoGrupo = async(req, res) => {

    let connection;

    try {
        const uid = req.params.id;
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        const sql = (`INSERT INTO alumnogrupo VALUES (:id_alumnogrup,:id_grupoalum)`);
        //desestruturar propiedades desde el body
        const { id_grupo } = req.body;

        const binds = [uid, id_grupo];

        // ejecuta la funcion SQL
        const result = await connection.execute(sql, binds, { autoCommit: true });
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

const actualizarInscripcion = async(req, res) => {

    let connection;
    const uid = req.params.id;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const { id_grupo } = req.body;

        const result = await connection.execute(`UPDATE alumnogrupo
        SET 
        ID_GRUPOALUM = :2
        where ID_ALUMNOGRUP = :3`, [id_grupo, uid], {
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


const eliminarinscripcion = async(req, res) => {
    let connection;

    const uid = req.params.id;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `delete from alumnogrupo where ID_ALUMNOGRUP =:id`, [uid], { autoCommit: true }

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
    getalumnoGrupo,
    addAlumnoGrupo,
    eliminarinscripcion,
    actualizarInscripcion
};