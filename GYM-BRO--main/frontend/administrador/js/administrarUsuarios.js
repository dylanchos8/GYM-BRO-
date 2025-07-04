// URL base de la API para gestionar usuarios
const API_URL = 'http://localhost:3000/api/usuario';
/**
 * Evento que se dispara cuando se envía el formulario de registro.
 * Captura los datos del formulario, los envía al backend mediante POST,
 * y si todo sale bien, recarga la tabla de usuarios.
 */
document.getElementById('formUsuario').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que se recargue la página

  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;
  const id_rol = document.getElementById('rol').value;

  try {
    // Enviar los datos al backend para registrar un nuevo usuario
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, contraseña, id_rol })
    });

    const datos = await respuesta.json(); // Parsear respuesta

    if (respuesta.ok) {
      // Si se registró correctamente, se muestra un mensaje y se limpia el formulario
      alert(datos.mensaje || 'Usuario registrado correctamente');
      document.getElementById('formUsuario').reset();
      cargarUsuarios(); // Recargar la tabla
    } else {
      // Mostrar mensaje de error del backend
      alert('Error al agregar usuario: ' + (datos.error || datos.message));
    }
  } catch (error) {
    alert('Error al conectar con el servidor');
    console.error(error);
  }
});

/**
 * Función que obtiene todos los usuarios desde el backend
 * y los muestra en la tabla del HTML.
 */
async function cargarUsuarios() {
  try {
    const res = await fetch(API_URL); // Petición GET a la API
    const datos = await res.json(); // Convertir respuesta a JSON

    const tabla = document.getElementById('tablaUsuarios');
    tabla.innerHTML = ''; // Limpiar tabla antes de llenarla

    // Por cada usuario recibido, agregar una fila a la tabla
    datos.forEach(usuario => {
      tabla.innerHTML += `
        <tr>
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>********</td> <!-- Contraseña oculta -->
          <td>${usuario.id_rol}</td>
          <td><button onclick="eliminarUsuario(${usuario.id})">Eliminar usuario</button></td>
        </tr>
      `;
    });
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
  }
}

/**
 * Función que elimina un usuario por su ID.
 * Pide confirmación antes de realizar la acción.
 * Luego hace una petición DELETE al backend.
 */
function eliminarUsuario(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('No se pudo eliminar el usuario');
        return res.json(); // Parsear la respuesta
      })
      .then(data => {
        alert(data.message || 'Usuario eliminado correctamente');
        cargarUsuarios(); // Recargar tabla
      })
      .catch(error => {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario');
      });
  }
}

// Llamada inicial para cargar los usuarios al abrir la página
cargarUsuarios();
