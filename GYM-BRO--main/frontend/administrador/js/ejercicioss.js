const API_EJERCICIOS = 'http://localhost:3000/api/ejercicios';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(API_EJERCICIOS);
    const ejercicios = await res.json();

    const contenedor = document.getElementById('listaEjercicios');
    contenedor.innerHTML = '';

    ejercicios.forEach(ej => {
      const card = document.createElement('div');
      card.classList.add('ejercicio-boton');

      card.innerHTML = `
        <div class="frase-ejercicio">
          <h2>¡${ej.nombre.toUpperCase()} te lleva al siguiente nivel!</h2>
        </div>
        <button class="btn-ejercicio" onclick="window.location.href='detalle.html?id=${ej.id}'">
          <img src="${ej.imagen}" alt="${ej.nombre}">
        </button>
        <p class="descripcion-ejercicio">${ej.descripcion}</p>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar ejercicios:', error);
  }
});
