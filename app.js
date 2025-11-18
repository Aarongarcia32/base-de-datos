// index.js
require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse JSON

// --- Rutas ---
// usuarios 
app.get('/usuario', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuario ORDER BY fecha_registro DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});


// GET usuario por id
app.get('/usuario/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuario WHERE id_usuario = ?',
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});


// POST crear usuario 
app.post('/usuario', async (req, res) => {
  const { nombre, correo, password, id_tipo } = req.body;

  if (!nombre || !correo || !password || !id_tipo) {
    return res.status(400).json({ 
      error: 'nombre, correo, password e id_tipo son requeridos' 
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO usuario (nombre, correo, password, fecha_registro, id_tipo)
       VALUES (?, ?, ?, NOW(), ?)`,
      [nombre, correo, password, id_tipo]
    );

    const [rows] = await pool.query(
      'SELECT * FROM usuario WHERE id_usuario = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});


// PUT actualizar usuario 
app.put('/usuario/:id', async (req, res) => {
  const { nombre, correo, password, id_tipo } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE usuario 
       SET 
          nombre = COALESCE(?, nombre),
          correo = COALESCE(?, correo),
          password = COALESCE(?, password),
          id_tipo = COALESCE(?, id_tipo)
       WHERE id_usuario = ?`,
      [nombre, correo, password, id_tipo, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    const [rows] = await pool.query(
      'SELECT * FROM usuario WHERE id_usuario = ?',
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});


// DELETE eliminar usuario 
app.delete('/usuario/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM usuario WHERE id_usuario = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

//endpoint
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    res.json({
      ok: true,
      message: "Conexión a MySQL exitosa",
      resultado: rows[0].resultado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});


