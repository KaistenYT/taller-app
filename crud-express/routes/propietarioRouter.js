import express from 'express';
import { PropietarioController } from '../controllers/propietarioController.js';

const router = express.Router();

// Rutas para vistas (accedidas desde /propietarios)
router.get('/', PropietarioController.getAllPropietarios);

// Rutas API (accedidas desde /api/propietarios)
router.get('/', PropietarioController.getAllPropietarios);
router.post('/agregar', PropietarioController.createPropietarrio);
router.get('/:id', PropietarioController.getPropietarioById);
router.put('/:id', PropietarioController.updatePropietario);
router.delete('/:id', PropietarioController.deletePropietario);

export default router;