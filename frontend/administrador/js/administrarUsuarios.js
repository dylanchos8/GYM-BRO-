const API_URL = 'http://localhost:3000/api/usuario';

document.getElementById('formUsuario').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;
  const id_rol = document.getElementById('rol').value;

  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, contraseña, id_rol })
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      alert(datos.mensaje); // Muestra "Cliente agregado"
      document.getElementById('formUsuario').reset();
      cargarUsuarios();
    } else {
      alert('Error al agregar usuario: ' + datos.error);
    }
  } catch (error) {
    alert('Error al conectar con el servidor');
    console.error(error);
  }
});

async function cargarUsuarios() {
  try {
    const res = await fetch(API_URL);
    const datos = await res.json();

    const tabla = document.getElementById('tablaUsuarios');
    tabla.innerHTML = '';
    datos.forEach(usuario => {
      tabla.innerHTML += `
        <tr>
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>********</td> <!-- ocultar contraseña -->
          <td>${usuario.id_rol}</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error('Error al cargar los clientes:', error);
  }
}

cargarUsuarios();