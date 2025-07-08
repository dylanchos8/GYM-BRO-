 //routes definen los puntos de entrada GET y POST, además llama a los metodos
import express from 'express';
import { obtenerUsuarios, crearUsuario, recuperarContrasena, eliminarUsuarioPorId} from '../controllers/usuarioController.js';


const router = express.Router();

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.post('/recuperar-contrasena', recuperarContrasena);
router.delete('/:id', eliminarUsuarioPorId);

export default router;
