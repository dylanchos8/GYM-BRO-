// routes/ejercicioRoutes.js
import express from 'express';
<<<<<<< HEAD
import { agregarDieta, obtenerDietas } from '../controllers/dietaController.js';
=======
import { agregarDieta, obtenerDietas, eliminarDietaPorId } from '../controllers/dietaController.js';
>>>>>>> 4fb8b8a (Primer commit en dispositivo de casa GYM-BRO)

const router = express.Router();

router.get('/', obtenerDietas);
router.post('/', agregarDieta);
<<<<<<< HEAD
=======
router.delete('/:id', eliminarDietaPorId);
>>>>>>> 4fb8b8a (Primer commit en dispositivo de casa GYM-BRO)

export default router;