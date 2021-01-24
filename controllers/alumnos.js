const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

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
            `select id_alumno, nombre,apellido_pat, apellido_mat, edad ,correo_electronico
            from alumno`);
        // respuesta de la base de datos en formato json
        // rslt = JSON.stringify(result);
        // res.json(JSON.parse(rslt));
        console.log(res.json({
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
        // variables sql y binds para ejecucion
        const { name, lastname, surname, age, id_dir, id_sex } = req.body;
        sql = `BEGIN
        agregarAlumno(:n,:ln,:sn,:age,:dir, :sex); 
        END;`;
        binds = {
            n: name,
            ln: lastname,
            sn: surname,
            age: age,
            dir: id_dir,
            sex: id_sex
        };

        // ejecuta la funcion SQL
        const alumnos = await connection.execute(sql, binds);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Alumno agregado correctamente',
            alumnos



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

const actulizarAlumno = async(req, res) => {

    let connection;
    const uid = req.params.id;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const { NOMBRE, APELLIDO_PAT, APELLIDO_MAT, EDAD, CORREO_ELECTRONICO } = req.body;

        const alumnos = await connection.execute(`UPDATE alumno
        SET nombre = :1,
        apellido_pat = :2,
        apellido_mat = :3,
        edad = :4,
        correo_electronico = :8
        where id_alumno = :7`, [NOMBRE, APELLIDO_PAT, APELLIDO_MAT, EDAD, CORREO_ELECTRONICO, uid], {
            autoCommit: true
        });
        res.json({
            ok: true,
            msg: `Usuario actualizado`,
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


const eliminarAlumno = async(req, res) => {
    let connection;

    const uid = req.params.id;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const alumnos = await connection.execute(
            `delete from alumno where id_alumno =:id`, [uid], { autoCommit: true }

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
    getAlumnos,
    addAlumno,
    actulizarAlumno,
    eliminarAlumno
};