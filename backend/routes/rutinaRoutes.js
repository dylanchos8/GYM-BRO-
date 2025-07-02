import express from 'express';
import { agregarRutina, obtenerRutinas, eliminarRutinaPorId } from '../controllers/rutinaController.js';

const router = express.Router();

router.get('/', obtenerRutinas);
router.post('/', agregarRutina);
router.delete('/:id', eliminarRutinaPorId);

export default router;