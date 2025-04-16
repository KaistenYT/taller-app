const express = require('express')
const router = express.Router()
const RecepcionController  = require ('../controllers/recepcionController')


router.get('/recepciones/listar', RecepcionController.getAllRecepcion)
router.get('/recepciones/:id', RecepcionController.getRecepcionById)
router.post('/recepciones/agregar', RecepcionController.createRecepcion)
router.put('/recepciones/:id/actualizar', RecepcionController.updateRecepcion)
router.delete('/recepciones/:id/eliminar', RecepcionController.deleteRecepcion)
router.get('/recepciones/propietario/:idPropietario', RecepcionController.getRecepcionByPropietario)
router.get('/recepciones/equipo/:idEquipo', RecepcionController.getRecepcionByEquipo)
router.get('/recepciones/estado/:estado', RecepcionController.getRecepcionByEstado)
router.get('/recepciones/fecha/:fechaRecepcion', RecepcionController.getRecepcionByFecha)
module.exports= router;
