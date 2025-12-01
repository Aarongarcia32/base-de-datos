const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../DB/mysql');
const config = require('../../config');

module.exports = {

    // ---------------------------------------------------------
    // REGISTRO DE USUARIO
    // ---------------------------------------------------------
    async registrarUsuario(nombre, correo, password, id_tipo) {

        // Hash de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear objeto usuario
        const usuario = {
            nombre,
            correo,
            password: hashedPassword,
            id_tipo // Aquí debe llegar 1 o 2
        };

        // Insertar en BD
        const resultado = await db.insertar('usuario', usuario);

        return {
            id_usuario: resultado.insertId,
            nombre,
            correo,
            id_tipo
        };
    },

    // ---------------------------------------------------------
    // LOGIN DE USUARIO
    // ---------------------------------------------------------
    async login(correo, password) {

        // Buscar usuario
        const filas = await db.query(
            `SELECT u.*, t.tipo 
             FROM usuario u
             JOIN tipos t ON u.id_tipo = t.id_tipo
             WHERE u.correo = ?`,
            [correo]
        );

        if (filas.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const usuario = filas[0];

        // Comparar contraseña
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) {
            throw new Error('Contraseña incorrecta');
        }

        // Crear token con id_usuario y id_tipo
        const token = jwt.sign(
            { 
                id_usuario: usuario.id_usuario, 
                id_tipo: usuario.id_tipo 
            },
            config.jwt.secret,
            { expiresIn: '1h' }
        );

        // Respuesta final
        return { 
            token, 
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                id_tipo: usuario.id_tipo,
                tipo: usuario.tipo // 'alumno' | 'profesor'
            }
        };
    }
};
