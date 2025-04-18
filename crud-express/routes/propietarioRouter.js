import express from 'express';
import { PropietarioController } from '../controllers/propietarioController.js';

const router = express.Router();

router.get('/propietarios', PropietarioController.getAllPropietarios);
router.get('/propietarios/:id', PropietarioController.getPropietarioById);
router.post('/propietarios/agregar', PropietarioController.createPropietarrio);
router.put('/propietario/:id/actualizar', PropietarioController.updatePropietario);
router.delete('/propietario/:id/eliminar', PropietarioController.deletePropietario);

export default router;