import { pool } from "../config/db.js";

export const crearUsuario = async (nombre, correo, contraseña, id_rol) => {
    const [result] = await pool.query(
        'INSERT INTO usuario (nombre, correo, contraseña, id_rol) VALUES (?, ?, ?, ?)',
        [nombre, correo, contraseña, id_rol]
    );
    return result.insertId;
};
 
export const buscarUsuarioPorCorreo = async (correo) => {
    const[rows] = await pool.query(
        'SELECT * FROM usuario WHERE correo = ?',
        [correo]
    );
    return rows[0];
};

export const obtenerRolPorId = async (id_rol) => {
    const [rows] = await pool.query(
        'SELECT nombre FROM roles WHERE id = ?',
        [id_rol]
    );
    return rows[0]?.nombre;
};