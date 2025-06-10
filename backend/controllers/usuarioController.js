//manejo de peticiones con fetch
import {getUsuarios, addUsuario} from '../models/usuarioModel.js';

export const obtenerUsuarios = async (req, res) => {
  try {
    const resultados = await getUsuarios();  // <-- Aquí usas await para llamar a la función async
    res.json(resultados);
  } catch (err) {
    console.error('Error en obtenerUsuarios:', err);
    res.status(500).json({ error: err.message });
  }
};

export const crearUsuario = (req, res) => {
    const cliente = req.body;
    addUsuario(cliente, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message});
        res.json({ mensaje: 'Usuario Agregado con exito', id:resultado.insertId});
    });
};