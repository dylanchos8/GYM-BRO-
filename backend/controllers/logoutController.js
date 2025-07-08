export const cerrarSesion = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid'); // Nombre por defecto de la cookie de sesión
    res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
  });
};
