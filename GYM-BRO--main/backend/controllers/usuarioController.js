import { getUsuarios, addUsuario, eliminarUsuarioBD } from '../models/usuarioModel.js';

/**
 * Obtiene todos los usuarios desde la base de datos.
 */
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Crea un nuevo usuario en la base de datos.
 */
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

/**
 * Elimina un usuario según su ID.
 */
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
