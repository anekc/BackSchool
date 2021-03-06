const oracledb = require('oracledb');

const dbConfig = require('../database/dbconfig');


const pruebaAlumnos = async(req, res) => {

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT NOMBRE, APELLIDO_MAT,EDAD
       FROM ALUMNO`
        );
        console.log(res.json({
            ok: true,
            msg: 'Alumnos cargados correctamente',
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

const addPruebaAlumnos = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // variables sql y binds para ejecucion

        //desestruturar propiedades desde el body
        const { name, lastname, surname, age, id_dir, id_sex } = req.body;

        // ejecuta la funcion SQL
        const result = await connection.execute(`
        BEGIN
        agregarAlumno(:n,:ln,:sn,:age,:dir, :sex);
        END;`, {
                n: name,
                ln: lastname,
                sn: surname,
                age: age,
                dir: id_dir,
                sex: id_sex
            }


        );


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
            msg: `
            Error inesperado revisar logs `

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
    pruebaAlumnos,
    addPruebaAlumnos
};