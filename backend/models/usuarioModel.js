import {pool} from '../config/db.js';

export const getUsuarios = async () => {
  const [rows] = await pool.query('SELECT * FROM usuario');
  return rows;
};

export const addUsuario = (usuario, callback) => {
    pool.query('insert into usuario set ?', usuario, callback);
};