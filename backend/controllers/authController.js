import bcrypt from 'bcrypt';
import { buscarUsuarioPorCorreo, crearUsuario, obtenerRolPorId } from '../models/userModel.js';
import nodemailer from 'nodemailer';

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
    try {
        const { nombre, correo, contraseña, id_rol } = req.body;

        // Verificar si el correo ya está registrado
        const userExistente = await buscarUsuarioPorCorreo(correo);
        if (userExistente) {
            return res.status(400).json({ message: 'Correo ya registrado' });
        }

        // Encriptar la contraseña con bcrypt
        const hash = await bcrypt.hash(contraseña, 10);

        // Guardar el nuevo usuario en la base de datos
        await crearUsuario(nombre, correo, hash, id_rol);

        // Configurar el transporte de correo usando Gmail y variables de entorno
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM, // tu correo
                pass: process.env.EMAIL_PASS  // contraseña de aplicación (no la personal)
            }
        });

        // Contenido del correo que se enviará al usuario
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: correo,
            subject: '¡Bienvenido a la GYM-BRO!',
            text: `Hola ${nombre}, tu cuenta se ha creado exitosamente. ¡Bienvenido!`
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        // Enviar respuesta al frontend
        res.status(201).json({ message: 'Usuario creado exitosamente y correo enviado' });

    } catch (error) {
        console.log('Error en register:', error);
        res.status(500).json({ message: 'Error interno del servidor: register' });
    }
};

// Función para iniciar sesión
export const login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        // Buscar el usuario por correo
        const user = await buscarUsuarioPorCorreo(correo);
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la guardada (encriptada)
        const esValido = await bcrypt.compare(contraseña, user.contraseña);
        if (!esValido) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Obtener el rol del usuario
        const rol = await obtenerRolPorId(user.id_rol);

        // Enviar respuesta con éxito de login
        res.status(200).json({ message: 'Login exitoso', rol });

    } catch (error) {
        console.log('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor: login' });
    }
};
