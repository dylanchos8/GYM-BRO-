import { getDietas, addDieta } from '../models/dietaModel.js';

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
<<<<<<< HEAD
    const dieta = req.body;
    const result = await addEjercicio(dieta);
    res.json({ mensaje: 'Dieta agregado con éxito', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Dieta ya registrado' });
    }
    res.status(500).json({ error: err.message });
=======
    const { dieta, frase, descripcion } = req.body;

    if (!dieta || !frase || !descripcion) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }

    await addDieta(dieta, frase, descripcion);
    res.status(201).json({ mensaje: 'dieta agregada correctamente' });
  } catch (error) {
    console.error('Error al agregar dieta:', error);
    res.status(500).json({ mensaje: 'Error al agregar la dieta' });
  }
};

// Eliminar rutina por ID
export const eliminarDietaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await eliminardietaBD(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Dieta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Dieta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar Dieta:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la Dieta' });
>>>>>>> 4fb8b8a (Primer commit en dispositivo de casa GYM-BRO)
  }
};