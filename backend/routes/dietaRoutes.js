// routes/ejercicioRoutes.js
import express from 'express';
import { agregarDieta, obtenerDietas } from '../controllers/dietaController.js';

const router = express.Router();

router.get('/', obtenerDietas);
router.post('/', agregarDieta);

export default router;