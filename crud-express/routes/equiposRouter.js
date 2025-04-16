const express = require('express');
const router = express.Router();
const EquipoController = require('../controllers/equipocController');

router.get('/equipos', EquipoController.getAllEquipos);
router.get('/equipos/:id', EquipoController.getEquipoById);
router.post('/equipos/agregar', EquipoController.createEquipo);
router.put('/equipos/:id', EquipoController.updateEquipo);
router.delete('/equipos/:id', EquipoController.deleteEquipo);

module.exports = router;