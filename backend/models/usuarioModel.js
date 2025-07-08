import { pool } from '../config/db.js';

/*Obtiene todos los usuarios desde la base de datos.*/
export const getUsuarios = async () => {
  const [rows] = await pool.query('SELECT * FROM usuario');
  return rows;
};

/*agrega usuarios a la base de datos*/ 
export const addUsuario = async (usuario) => {
  const [result] = await pool.query('INSERT INTO usuario SET ?', usuario);
  return result;
};

/*elimina usuariosde la base de datos*/

export const eliminarUsuarioBD = async (id) => {
  const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
  return result;
};

export const actualizarContrasena = async (correo, nuevaContrasena) => {
  return await pool.query('UPDATE usuario SET contrasena = ? WHERE correo = ?', [nuevaContrasena, correo]);
};

export const buscarUsuarioPorCorreo = async (correo) => {
  const [rows] = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
  return rows[0]; 
};
