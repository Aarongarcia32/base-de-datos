const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion;

// ===========================================
// Conexión automática con reconexión
// ===========================================
function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql, 2000);
        } else {
            console.log('DB Conectada!');
        }
    });

    conexion.on('error', (err) => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}

conMysql();

// ===========================================
// Universal query function
// ===========================================
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, params, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

module.exports = {
    query
};
