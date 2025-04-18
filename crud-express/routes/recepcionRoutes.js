const express = require('express')
const router = express.Router()
const RecepcionController  = require ('../controllers/recepcionController')


router.get('/recepciones/listar', RecepcionController.getAllRecepcion)
router.get('/recepciones/:id', RecepcionController.getRecepcionById)
router.post('/recepciones/:idPropietario/agregar', RecepcionController.createRecepcion)
router.put('/recepciones/:id/actualizar', RecepcionController.updateRecepcion)
router.delete('/recepciones/:id/eliminar', RecepcionController.deleteRecepcion)
module.exports= router;
