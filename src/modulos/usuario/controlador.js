const db = require('../../DB/mysql');

const TABLA = 'usuario';

// ===============================
// OBTENER TODOS
// ===============================
function todos() {
    return db.query(`SELECT * FROM ${TABLA}`);
}

// ===============================
// OBTENER UNO POR ID
// ===============================
function uno(id) {
    return db.query(`SELECT * FROM ${TABLA} WHERE id_usuario = ?`, [id]);
}

// ===============================
// INSERTAR NUEVO USUARIO
// ===============================
function agregar(body) {
    return db.query(`INSERT INTO ${TABLA} SET ?`, body);
}

// ===============================
// ACTUALIZAR USUARIO
// ===============================
function actualizar(id, body) {
    return db.query(`UPDATE ${TABLA} SET ? WHERE id_usuario = ?`, [body, id]);
}

// ===============================
// ELIMINAR USUARIO
// ===============================
function eliminar(id) {
    return db.query(`DELETE FROM ${TABLA} WHERE id_usuario = ?`, [id]);
}

module.exports = {
    todos,
    uno,
    agregar,
    actualizar,
    eliminar
};
