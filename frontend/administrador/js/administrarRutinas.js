const API_RUTINAS = 'http://localhost:3000/api/rutina';

document.getElementById('formRutina').addEventListener('submit', async (e) => {
  e.preventDefault();

  const rutina = document.getElementById('rutina').value.trim();
  const frase = document.getElementById('frase').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  try {
    const res = await fetch(API_RUTINAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rutina, frase, descripcion })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.mensaje || 'Rutina agregada correctamente');
      document.getElementById('formRutina').reset();
      cargarRutinas(); // recarga tabla y botones
    } else {
      alert('Error al agregar rutina.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al conectar con el servidor');
  }
});

async function cargarRutinas() {
  try {
    const res = await fetch(API_RUTINAS);
    const rutinas = await res.json();

    const tabla = document.getElementById('tablaRutinas');
    const contenedorBotones = document.getElementById('botonesRutinas');

    tabla.innerHTML = '';
    contenedorBotones.innerHTML = '';

    rutinas.forEach(ru => {
      tabla.innerHTML += `
        <tr>
          <td>${ru.id}</td>
          <td>${ru.rutina}</td>
          <td>${ru.frase}</td>
          <td>${ru.descripcion}</td>
        </tr>
      `;

      // Contenedor horizontal
      const filaRutina = document.createElement('div');
      filaRutina.className = 'fila-rutina';

      // Contenedor de frase y botón
      const columnaBoton = document.createElement('div');
      columnaBoton.className = 'columna-boton';

      const frase = document.createElement('p');
      frase.textContent = ru.frase;
      frase.className = 'rutina-frase';

      const boton = document.createElement('button');
      boton.textContent = ru.rutina;
      boton.className = 'boton-rutina';
      const nombreRuta = ru.rutina.toLowerCase().replace(/\s+/g, '_');
      boton.onclick = () => {
        window.location.href = `/rutinas/${nombreRuta}.html`;
      };

      columnaBoton.appendChild(frase);
      columnaBoton.appendChild(boton);

      // Descripción al lado
      const descripcion = document.createElement('p');
      descripcion.textContent = ru.descripcion;
      descripcion.className = 'rutina-descripcion';

      // Armar fila
      filaRutina.appendChild(columnaBoton);
      filaRutina.appendChild(descripcion);

      contenedorBotones.appendChild(filaRutina);
    });
  } catch (error) {
    console.error('Error al cargar rutinas:', error);
  }
}

cargarRutinas();


