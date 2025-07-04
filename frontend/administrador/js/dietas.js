const API_DIETAS = 'http://localhost:3000/api/dietas';

async function cargarDietas() {
  try {
    const res = await fetch(API_DIETAS);
    const dietas = await res.json();

    const contenedorBotones = document.getElementById('botonesDietas');
    contenedorBotones.innerHTML = '';

    dietas.forEach(di => {
      const dietasContainer = document.createElement('div');
      dietasContainer.className = 'dietas-container';

      const frase = document.createElement('h3');
      frase.textContent = di.frase;

      const descripcion = document.createElement('p');
      descripcion.textContent = di.descripcion;

      const boton = document.createElement('button');
      boton.textContent = di.dieta;
      boton.className = 'boton-dieta';
      const nombreRuta = di.dieta.toLowerCase().replace(/\s+/g, '_');
      boton.onclick = () => {
        window.location.href = `/dietas/${nombreRuta}.html`;
      };

      dietasContainer.appendChild(frase);
      dietasContainer.appendChild(boton);
      dietasContainer.appendChild(descripcion);

      contenedorBotones.appendChild(dietasContainer);
    });
  } catch (error) {
    console.error('Error al cargar dietas:', error);
  }
}

cargarDietas();