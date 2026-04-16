document.addEventListener('DOMContentLoaded', function () {
  var API_BASE_URL = 'http://localhost:3000';
  var form = document.getElementById('login-form');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var msg = document.getElementById('login-msg');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();

    if (email.indexOf('@') === -1 || password.length < 6) {
      msg.textContent = 'Revisa tus datos: correo valido y contrasena minima de 6 caracteres.';
      msg.style.color = '#ff6b6b';
      return;
    }

    msg.textContent = 'Verificando...';
    msg.style.color = '#aaaaaa';

    try {
      var response = await fetch(API_BASE_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      var data = await response.json();
      if (!response.ok) {
        msg.textContent = data.error || 'Correo o contrasena incorrectos.';
        msg.style.color = '#ff6b6b';
        return;
      }

      localStorage.setItem('urbantech-user', data.email || email);
      msg.textContent = 'Ingreso correcto. Redirigiendo...';
      msg.style.color = '#00e6a7';

      setTimeout(function () {
        window.location.href = './index.html';
      }, 900);
    } catch (error) {
      msg.textContent = 'No hay conexion con la API. Verifica que este ejecutandose en localhost:3000.';
      msg.style.color = '#ff6b6b';
    }
  });
});
