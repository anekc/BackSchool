const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//  función para obtener los alumnos desde la base de datos 

// const getDireccion = async(req, res) => {

//     let connection;

//     try {
//         // hace la conexion a la base de datos 
//         connection = await oracledb.getConnection(dbConfig);
//         // ejecuta la funcion SQL
//         const result = await connection.execute(
//             // consulta con filtro
//             //     `select nombre, apellido_mat, edad
//             // from alumno where nombre = :name`, ['Alejandro']);

//             // consulta general
//             `select nombre, apellido_mat, edad
//             from alumno`);
//         // respuesta de la base de datos en formato json
//         console.log(res.json({
//             ok: true,
//             msg: 'Alumnos cargados correctamente',
//             result

//         }));

//     } catch (err) {
//         console.error(err);
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// };


const addDireccion = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // variables sql y binds para ejecucion
        const { municipio, colonia, cp, calle, numex, numint, id_estado } = req.body;
        sql = `BEGIN
        agregarDireccion(:m,:c,:cp,:calle,:numex, :numin, :ides);
        END;`;
        binds = {
            m: municipio,
            c: colonia,
            cp: cp,
            calle: calle,
            numex: numex,
            numin: numint,
            ides: id_estado
        };

        // ejecuta la funcion SQL
        const result = await connection.execute(sql, binds);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Dirección agregada correctamente',
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

const actualizarDireccion = async(req, res) => {

    let connection;
    const uid = req.params.id;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const { municipio, colonia, cp, calle, numex, numint, id_estado } = req.body;

        const result = await connection.execute(`UPDATE direccion
        SET municipio = :1,
        colonia = :2,
        cp = :3,
        calle = :4,
        numero_ext = :8,
        numero_int= :5,
        dir_id_estado= :6 
        where id_direccion = :7`, [municipio, colonia, cp, calle, numex, numint, id_estado, uid], {
            autoCommit: true
        });
        res.json({
            ok: true,
            msg: `Dirección actualizada`,
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


const eliminarDireccion = async(req, res) => {
    let connection;

    const uid = req.params.id;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `delete from direccion where id_direccion =:id`, [uid], { autoCommit: true }

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
            msg: `Error inesperado revisar logs `
        });

    }
};

// consulta SQL



module.exports = {
    addDireccion,
    actualizarDireccion,
    eliminarDireccion
};