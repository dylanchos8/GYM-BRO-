document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;
    const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({correo, contraseña}),
    });

    const data = await res.json();
    if(res.status === 200){
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('correo', correo); //opcional

        if(data.rol === 'cliente') {
            window.location.href = '/usuario/interfazprincipal.html';
        } else if(data.rol === 'admin') {
            window.location.href = '/administrador/interfazprincipal_admin.html'
        }
    } else {
        alert (data.message);
    }
})