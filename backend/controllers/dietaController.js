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
    const dieta = req.body;
    const result = await addEjercicio(dieta);
    res.json({ mensaje: 'Dieta agregado con éxito', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Dieta ya registrado' });
    }
    res.status(500).json({ error: err.message });
  }
};