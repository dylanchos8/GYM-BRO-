import { getRutinas, addRutina, eliminarRutinaBD } from '../models/rutinaModel.js';

// Obtener todas las rutinas
export const obtenerRutinas = async (req, res) => {
  try {
    const rutinas = await getRutinas();
    res.json(rutinas);
  } catch (err) {
    console.error('Error al obtener rutinas:', err);
    res.status(500).json({ error: 'Error al obtener las rutinas' });
  }
};

// Agregar una nueva rutina
export const agregarRutina = async (req, res) => {
  try {
    const { rutina, frase, descripcion } = req.body;

    if (!rutina || !frase || !descripcion) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    await addRutina(rutina, frase, descripcion);
    res.status(201).json({ mensaje: 'Rutina agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar rutina:', error);
    res.status(500).json({ mensaje: 'Error al agregar la rutina' });
  }
};

// Eliminar rutina por ID
export const eliminarRutinaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await eliminarRutinaBD(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Rutina no encontrada' });
    }

    res.status(200).json({ mensaje: 'Rutina eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar rutina:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la rutina' });
  }
};
