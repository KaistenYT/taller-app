const express = require('express');
const router = express.Router();
const PropietarioController = require('../controllers/propietarioController');

router.get('/propietarios', PropietarioController.getAllPropietarios)
router.get('/propietarios/:id', PropietarioController.getPropietarioById)
router.post('/propietarios/agregar',PropietarioController.createPropietarrio)
router.put('/propietario/:id/actualizar', PropietarioController.updatePropietario)
router.delete('/propietario/:id/eliminar', PropietarioController.deletePropietario)

module.exports = router;