import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import session from 'express-session'; 
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import rutinaRoutes from './routes/rutinaRoutes.js';
import dietaRoutes from './routes/dietaRoutes.js';
import logoutRoutes from './routes/logoutRoutes.js'; 


dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // permite cookies
app.use(express.json());

// Configurar sesiones
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // usa true si estás en HTTPS
}));

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas
app.use('/api', authRoutes); //login
app.use('/api', logoutRoutes); //logout
app.use('/api/usuario', usuarioRoutes);
app.use('/api/rutina', rutinaRoutes);
app.use('/api/dietas', dietaRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/inicio/inicio.html'));
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
