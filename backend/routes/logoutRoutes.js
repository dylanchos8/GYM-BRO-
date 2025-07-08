import express from 'express';
import { cerrarSesion } from '../controllers/logoutController.js';
const router = express.Router();

router.post('/logout', cerrarSesion);

export default router;
