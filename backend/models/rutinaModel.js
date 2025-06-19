import { pool } from '../config/db.js';

export const getRutinas = async () => {
  const [rows] = await pool.query('SELECT * FROM rutina');
  return rows;
};

export const addRutina = async (rutina, frase, descripcion) => {
  const [result] = await pool.query(
    'INSERT INTO rutina (rutina, frase, descripcion) VALUES (?, ?, ?)',
    [rutina, frase, descripcion]
  );
  return result;
};
