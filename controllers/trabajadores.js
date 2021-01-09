const { response } = require('express');
// paquete para usar oracledb
const oracledb = require('oracledb');
// configuracion de la base de datos
const dbConfig = require('../database/dbconfig');

// formato de salida
// To do ver como poder mostrar esta info en el front
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//  función para obtener los alumnos desde la base de datos 

const getTrabajador = async(req, res) => {

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
            `select id_empleado , nombre, apellido_mat, edad, departamento
            from empleado`);
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Empleados cargados correctamente',
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


const addTrabajador = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        const { name, lastname, surname, age, dep, id_dir, id_sex, id_turno } = req.body;
        // ejecuta la funcion SQL
        const result = await connection.execute(`
        BEGIN
        agregarEmpleado(:n,:ln,:sn,:age,:dep,:dir, :sex, :turno);
        END;`, {
            n: name,
            ln: lastname,
            sn: surname,
            age: age,
            dep: dep,
            dir: id_dir,
            sex: id_sex,
            turno: id_turno
        });
        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Empleado agregado correctamente'

        }));

    } catch (err) {
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: `Razón del error ${err}`

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


// consulta SQL



module.exports = {
    getTrabajador,
    addTrabajador
};