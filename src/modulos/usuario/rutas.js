const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

// RUTAS
router.get('/', todos);           
router.get('/:id', uno);          
router.post('/', agregar);        
router.put('/:id', actualizar);   
router.delete('/:id', eliminar);  

// ================================================
// OBTENER TODOS
// ================================================
async function todos(req, res, next) {
   try {
      const items = await controlador.todos();
      respuesta.success(req, res, items, 200);
   } catch (err) {
      next(err);
   }
}

// ================================================
// OBTENER UNO
// ================================================
async function uno(req, res, next) {
   try {
      const items = await controlador.uno(req.params.id);
      respuesta.success(req, res, items, 200);
   } catch (err) {
      next(err);
   }
}

// ================================================
// AGREGAR (INSERTAR)
// ================================================
async function agregar(req, res, next) {
   try {
      const result = await controlador.agregar(req.body);
      respuesta.success(req, res, {
         mensaje: 'Usuario creado correctamente',
         result
      }, 201);
   } catch (err) {
      next(err);
   }
}

// ================================================
// ACTUALIZAR
// ================================================
async function actualizar(req, res, next) {
   try {
      const id = req.params.id;
      const data = req.body;

      const result = await controlador.actualizar(id, data);

      respuesta.success(req, res, {
         mensaje: 'Usuario actualizado correctamente',
         result
      }, 200);
   } catch (err) {
      next(err);
   }
}

// ================================================
// ELIMINAR
// ================================================
async function eliminar(req, res, next) {
   try {
      const result = await controlador.eliminar(req.params.id);
      respuesta.success(req, res, 'Usuario eliminado correctamente', 200);
   } catch (err) {
      next(err);
   }
}

module.exports = router;
