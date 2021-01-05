const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');



const dbConnection = async() => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        console.log('DB online');
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de iniciar la basde de datos ver los logs');
    }
};


module.exports = {
    dbConnection
};