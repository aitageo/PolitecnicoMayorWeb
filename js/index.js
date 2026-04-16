document.addEventListener('DOMContentLoaded', function () {
  var listaCarrito = document.getElementById('lista-carrito');
  var contadorCarrito = document.getElementById('cart-count');
  var totalCarrito = document.getElementById('cart-total');
  var year = document.getElementById('year');
  var botonesAgregar = document.querySelectorAll('.btn');
  var secciones = document.querySelectorAll('.reveal');
  var inputBuscar = document.getElementById('buscar-producto');
  var listaProductos = document.getElementById('lista-productos');
  var mensajeSinResultados = document.getElementById('sin-resultados');

  var carrito = [];

  year.textContent = new Date().getFullYear();

  for (var i = 0; i < secciones.length; i++) {
    secciones[i].classList.add('active');
  }

  for (var j = 0; j < botonesAgregar.length; j++) {
    botonesAgregar[j].addEventListener('click', function (e) {
      e.preventDefault();

      var producto = e.target.closest('.Producto');
      if (!producto) {
        return;
      }

      var titulo = producto.querySelector('h5').textContent;
      var precio = parseInt(producto.querySelector('.precio').textContent, 10);

      carrito.push({ titulo: titulo, precio: precio });
      pintarCarrito();
    });
  }

  listaCarrito.addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    var index = parseInt(e.target.getAttribute('data-index'), 10);
    carrito.splice(index, 1);
    pintarCarrito();
  });

  if (inputBuscar && listaProductos) {
    inputBuscar.addEventListener('input', filtrarProductos);
  }

  function pintarCarrito() {
    listaCarrito.innerHTML = '';

    var total = 0;

    for (var k = 0; k < carrito.length; k++) {
      total += carrito[k].precio;

      var li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = '<span>' + carrito[k].titulo + ' - $' + carrito[k].precio + '</span>' +
        '<button data-index="' + k + '" type="button">Quitar</button>';

      listaCarrito.appendChild(li);
    }

    contadorCarrito.textContent = carrito.length;
    totalCarrito.textContent = total;
  }

  function filtrarProductos() {
    var texto = inputBuscar.value.toLowerCase().trim();
    var productos = listaProductos.querySelectorAll('.Producto');
    var coincidencias = 0;

    for (var i = 0; i < productos.length; i++) {
      var nombre = productos[i].querySelector('h5').textContent.toLowerCase();
      var visible = nombre.indexOf(texto) !== -1;

      productos[i].style.display = visible ? '' : 'none';
      if (visible) {
        coincidencias++;
      }
    }

    if (mensajeSinResultados) {
      mensajeSinResultados.hidden = coincidencias > 0;
    }
  }
});









