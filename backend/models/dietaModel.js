// dietaModel.js
import { pool } from '../config/db.js';

export const getDietas = async () => {
  const [rows] = await pool.query('SELECT * FROM dietas');
  return rows;
};

export const addDieta = async (dieta, frase, descripcion, imagen) => {
  const [result] = await pool.query(
    'INSERT INTO dietas (dieta, frase, descripcion, imagen) VALUES (?, ?, ?, ?)',
    [dieta, frase, descripcion, imagen]
  );
  return result;
};

export const eliminarDietaBD = async (id) => {
  const [result] = await pool.query('DELETE FROM dietas WHERE id = ?', [id]);
  return result;
};
