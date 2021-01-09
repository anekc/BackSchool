//funcion para agregar elementos a la base de datos con insert to

const addAlumno = async(req, res) => {

    let connection;

    try {
        // hace la conexion a la base de datos 
        connection = await oracledb.getConnection(dbConfig);
        // variables sql y binds para ejecucion
        const sql = (`INSERT INTO ALUMNO VALUES (:ID_ALUMNO, :NOMBRE,:APELLIDO_PAT, :APELLIDO_MAT,:EDAD,:CORREO_ELECTRONICO, :AL_ID_DIRECCION, :AL_ID_SEXO)`);
        //desestruturar propiedades desde el body
        const { id, name, lastname, surname, age, email, id_dir, id_sex } = req.body;
        const binds = [id, name, lastname, surname, age, email, id_dir, id_sex];

        // ejecuta la funcion SQL
        const result = await connection.execute(sql, binds, { autoCommit: true });


        // respuesta de la base de datos en formato json
        console.log(res.json({
            ok: true,
            msg: 'Alumno agregado correctamente'



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


// funcion para agregar con procedimientos almacenados

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
        });
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