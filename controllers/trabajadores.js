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
            `select id_empleado , nombre, apellido_mat, edad,correo_electronico, departamento
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

const actualizarEmpleado = async(req, res) => {

    let connection;
    const uid = req.params.id;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const { name, lastname, surname, age, dep, email, id_dir, id_sex, id_turno } = req.body;

        const result = await connection.execute(`UPDATE empleado
        SET nombre = :1,
        apellido_pat = :2,
        apellido_mat = :3,
        edad = :4,
        departamento = :9,
        correo_electronico = :8,
        emp_id_direccion= :5,
        emp_id_sexo = :6 ,
        emp_id_turno = :10
        where id_empleado = :7`, [name, lastname, surname, age, dep, email, id_dir, id_sex, id_turno, uid], {
            autoCommit: true
        });
        res.json({
            ok: true,
            msg: `Trabajador actualizado`,
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


const eliminarEmpleado = async(req, res) => {
    let connection;

    const uid = req.params.id;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `delete from empleado where id_empleado =:id`, [uid], { autoCommit: true }

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
    getTrabajador,
    addTrabajador,
    actualizarEmpleado,
    eliminarEmpleado
};