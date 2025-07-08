document.getElementById('formRecuperar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value.trim();
  const nuevaContrasena = document.getElementById('nuevaContrasena').value.trim();

  try {
    const res = await fetch('http://localhost:3000/api/usuario/recuperar-contrasena', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, nuevaContrasena })
    });

    const data = await res.json();
    alert(data.mensaje);
  } catch (error) {
    alert('Error al recuperar contraseña');
    console.error(error);
  }
});
