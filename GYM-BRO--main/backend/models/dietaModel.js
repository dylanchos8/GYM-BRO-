// dietaModel.js
import { pool } from '../config/db.js';

export const getDietas = async () => {
  const [rows] = await pool.query('SELECT * FROM dietas');
  return rows;
};

export const addDieta= async (dieta) => {
  const [result] = await pool.query('INSERT INTO dietas SET ?', dieta);
  return result;
<<<<<<< HEAD
=======
};

export const eliminardietaBD = async (id) => {
  const [result] = await pool.query('DELETE FROM dietas WHERE id = ?', [id]);
  return result;
>>>>>>> 4fb8b8a (Primer commit en dispositivo de casa GYM-BRO)
};