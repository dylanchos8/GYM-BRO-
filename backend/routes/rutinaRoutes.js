import express from 'express';
import { agregarRutina, obtenerRutinas } from '../controllers/rutinaController.js';

const router = express.Router();

router.get('/', obtenerRutinas);
router.post('/', agregarRutina);

export default router;