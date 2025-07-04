import { getDietas, addDieta, eliminarDietaBD } from '../models/dietaModel.js';

export const obtenerDietas= async (req, res) => {
  try {
    const dietas = await getDietas();
    res.json(dietas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const agregarDieta = async (req, res) => {
  try {
    const { dieta, frase, descripcion, imagen } = req.body;

    if (!dieta || !frase || !descripcion || !imagen) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    await addDieta(dieta, frase, descripcion, imagen);
    res.status(201).json({ mensaje: 'Dieta agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar dieta:', error);
    res.status(500).json({ mensaje: 'Error al agregar la dieta' });
  }
};

// Eliminar rutina por ID
export const eliminarDietaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await eliminarDietaBD(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Dieta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Dieta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar Dieta:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la Dieta' });
  }
};