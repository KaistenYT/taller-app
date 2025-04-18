import express from 'express';
import { PropietarioController } from '../controllers/propietarioController.js';

const router = express.Router();

// Vista de propietarios
router.get('/', PropietarioController.getAllPropietarios);

// API endpoints
router.get('/api/propietarios', PropietarioController.getAllPropietarios);
router.get('/api/propietarios/:id', PropietarioController.getPropietarioById);
router.post('/api/propietarios/agregar', PropietarioController.createPropietarrio);
router.put('/api/propietario/:id/actualizar', PropietarioController.updatePropietario);
router.delete('/api/propietario/:id/eliminar', PropietarioController.deletePropietario);

export default router;