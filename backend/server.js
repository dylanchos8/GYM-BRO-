import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import rutinaRoutes from './routes/rutinaRoutes.js';
import dietaRoutes from './routes/dietaRoutes.js';


dotenv.config(); //activa la librería dotenv. Esta librería busca un archivo llamado .env

const app = express();
app.use(cors());
app.use(express.json()); // necesario para leer req.body si usas JSON

// Para obtener __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Montar las rutas de autenticación
app.use('/api', authRoutes); // <-- Añadido
// ruta usuario
app.use('/api/usuario', usuarioRoutes);
//ruta ejercicios
app.use('/api/rutina', rutinaRoutes);
//ruta dietas
app.use('/api/dietas', dietaRoutes);

// Ruta raíz que sirve login.html por defecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/inicio/inicio.html'));
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
