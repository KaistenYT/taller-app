import express from 'express';
import { RecepcionController } from '../controllers/recepcionController.js';

const router = express.Router();

// Rutas para vistas (accedidas desde /recepciones)
router.get('/', RecepcionController.getAllRecepciones);

// Rutas API (accedidas desde /api/recepciones)
router.get('/', RecepcionController.getAllRecepciones);
router.post('/agregar', RecepcionController.createRecepcion);
router.get('/:id', RecepcionController.getRecepcionById);
router.put('/:id', RecepcionController.updateRecepcion);
router.delete('/:id', RecepcionController.deleteRecepcion);


export default router;
