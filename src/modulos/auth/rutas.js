const express = require('express');
const controlador = require('./controlador');
const router = express.Router();

// ============================
//  REGISTRO DE USUARIO
// ============================
router.post('/register', async (req, res, next) => {
    try {
        const { nombre, correo, password, id_tipo } = req.body; // <-- corregido

        const nuevoUsuario = await controlador.registrarUsuario(
            nombre,
            correo,
            password,
            id_tipo   // <-- corregido
        );

        res.status(201).json({
            error: false,
            status: 201,
            body: nuevoUsuario
        });

    } catch (err) {
        next(err);
    }
});

// ============================
//  LOGIN DE USUARIO
// ============================
router.post('/login', async (req, res, next) => {
    try {
        const { correo, password } = req.body;

        const data = await controlador.login(correo, password);

        res.json({
            error: false,
            status: 200,
            body: data
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;

