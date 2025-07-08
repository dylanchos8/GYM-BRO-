import { pool } from '../config/db.js';
import { getUsuarios, addUsuario, eliminarUsuarioBD, buscarUsuarioPorCorreo} from '../models/usuarioModel.js';


export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const crearUsuario = async (req, res) => {
  try {
    const usuario = req.body;
    const result = await addUsuario(usuario);
    res.json({ mensaje: 'Usuario agregado con éxito', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }
    res.status(500).json({ error: err.message });
  }
};


export const eliminarUsuarioPorId = async (req, res) => {
  try {
    const id = req.params.id;
    await eliminarUsuarioBD(id);
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};


export const recuperarContrasena = async (req, res) => {
  try {
    const { correo, nuevaContrasena } = req.body;

    const usuario = await buscarUsuarioPorCorreo(correo);
    if (!usuario) {
      return res.status(404).json({ error: 'Correo no encontrado' });
    }

    await pool.query('UPDATE usuario SET contraseña = ? WHERE correo = ?', [nuevaContrasena, correo]);
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al recuperar contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
