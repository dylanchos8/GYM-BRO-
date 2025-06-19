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
