// dietaModel.js
import { pool } from '../config/db.js';

export const getDietas = async () => {
  const [rows] = await pool.query('SELECT * FROM dietas');
  return rows;
};

export const addDieta= async (dieta) => {
  const [result] = await pool.query('INSERT INTO dietas SET ?', dieta);
  return result;
};