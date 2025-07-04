const API_DIETAS = 'http://localhost:3000/api/dietas';

document.getElementById('formDieta').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dieta = document.getElementById('dieta').value.trim();
  const frase = document.getElementById('frase').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const imagen = document.getElementById('imagen').value.trim();

  try {
    const res = await fetch(API_DIETAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dieta, frase, descripcion, imagen })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.mensaje || 'Dieta agregada correctamente');
      document.getElementById('formDieta').reset();
      cargarDieta(); // recarga tabla y botones
    } else {
      alert('Error al agregar dieta.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al conectar con el servidor');
  }
});

async function cargarDieta() {
  try {
    const res = await fetch(API_DIETAS);
    const dieta = await res.json();

    const tabla = document.getElementById('tablaDietas');
    const contenedorBotones = document.getElementById('botonesdietas');

    tabla.innerHTML = '';
    contenedorBotones.innerHTML = '';

    dietas.forEach(di => {
      tabla.innerHTML += `
        <tr>
          <td>${di.id}</td>
          <td>${di.dieta}</td>
          <td>${di.frase}</td>
          <td>${di.descripcion}</td>
          <td>${di.imagen}</td>
          <td><button onclick="eliminarRutina(${di.id})">Eliminar Rutina</button></td>
        </tr>
      `;

      // Contenedor horizontal
      const filaDieta = document.createElement('div');
      filaDieta.className = 'fila-dieta';

      // Contenedor de frase y botón
      const columnaBoton = document.createElement('div');
      columnaBoton.className = 'columna-boton';

      const frase = document.createElement('p');
      frase.textContent = ru.frase;
      frase.className = 'dieta-frase';

      const boton = document.createElement('button');
      boton.textContent = di.dieta;
      boton.className = 'boton-dieta';
      const nombreRuta = di.dieta.toLowerCase().replace(/\s+/g, '_');
      boton.onclick = () => {
        window.location.href = `/dietas/${nombreRuta}.html`;
      };

      columnaBoton.appendChild(frase);
      columnaBoton.appendChild(boton);

      // Descripción al lado
      const descripcion = document.createElement('p');
      descripcion.textContent = ru.descripcion;
      descripcion.className = 'dieta-descripcion';

      // Armar fila
      filaDieta.appendChild(columnaBoton);
      filaDieta.appendChild(descripcion);

      contenedorBotones.appendChild(filaRutina);
    });
  } catch (error) {
    console.error('Error al cargar rutinas:', error);
  }
}


// eliminar rutinas//
function eliminarDieta(id) {
  if (confirm('¿Estás seguro de que deseas eliminar esta dieta?')) {
    fetch(`${API_DIETAS}/${id}`, {
      method: 'delete'
    })
      .then(res => {
        if (!res.ok) throw new Error('No se pudo eliminar la dieta');
        return res.json(); // Parsear la respuesta
      })
      .then(data => {
        alert(data.message || 'Dieta eliminada correctamente');
        cargarDietas(); // Recargar tabla
      })
      .catch(error => {
        console.error('Error al eliminar Dieta:', error);
        alert('Error al eliminar dieta');
      });
  }
}

cargarDietas();