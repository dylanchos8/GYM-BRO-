// routes/ejercicioRoutes.js
import express from 'express';
import { agregarDieta, obtenerDietas, eliminarDietaPorId } from '../controllers/dietaController.js';

const router = express.Router();

router.get('/', obtenerDietas);
router.post('/', agregarDieta);
router.delete('/:id', eliminarDietaPorId);

export default router;