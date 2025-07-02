const API_RUTINAS = 'http://localhost:3000/api/rutina';

async function cargarRutinas() {
  try {
    const res = await fetch(API_RUTINAS);
    const rutinas = await res.json();

    const contenedorBotones = document.getElementById('botonesRutinas');
    contenedorBotones.innerHTML = '';

    rutinas.forEach(ru => {
      const rutinaContainer = document.createElement('div');
      rutinaContainer.className = 'rutina-container';

      const frase = document.createElement('h3');
      frase.textContent = ru.frase;

      const descripcion = document.createElement('p');
      descripcion.textContent = ru.descripcion;

      const boton = document.createElement('button');
      boton.textContent = ru.rutina;
      boton.className = 'boton-rutina';
      const nombreRuta = ru.rutina.toLowerCase().replace(/\s+/g, '_');
      boton.onclick = () => {
        window.location.href = `/rutinas/${nombreRuta}.html`;
      };

      rutinaContainer.appendChild(frase);
      rutinaContainer.appendChild(boton);
      rutinaContainer.appendChild(descripcion);

      contenedorBotones.appendChild(rutinaContainer);
    });
  } catch (error) {
    console.error('Error al cargar rutinas:', error);
  }
}

cargarRutinas();