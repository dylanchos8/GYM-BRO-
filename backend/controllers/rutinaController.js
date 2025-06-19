import { getRutinas, addRutina } from '../models/rutinaModel.js';

export const obtenerRutinas = async (req, res) => {
  try {
    const rutinas = await getRutinas();
    res.json(rutinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const agregarRutina = async (req, res) => {
  try {
    const { rutina, frase, descripcion } = req.body;

    // Aquí deberías llamar a tu modelo para guardar el ejercicio
    await addRutina(rutina, frase, descripcion );

    res.status(201).json({ mensaje: 'rutina agregada correctamente' });
  } catch (error) {
    console.error('Error al crear ejercicio:', error);
    res.status(500).json({ mensaje: 'Error al crear la rutina' });
  }
};