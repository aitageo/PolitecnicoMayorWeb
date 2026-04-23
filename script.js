
const productosGamer = [
    { id: 1, nombre: 'PlayStation 5 Slim', precio: 2500000, imagen: 'img/ps5.png.jpeg', categoria: 'Consolas' },
    { id: 2, nombre: 'Xbox Series X', precio: 2400000, imagen: 'img/xbox.png.jpeg', categoria: 'Consolas' },
    { id: 3, nombre: 'Control DualSense PS5', precio: 350000, imagen: 'img/control.png.jpeg', categoria: 'Accesorios' },
    { id: 4, nombre: 'Elden Ring - PS5', precio: 280000, imagen: 'img/elden-ring.png.jpeg', categoria: 'Juegos' }
];


let Totalcarrito = []; 
let count = 0;

function cargarProductos(lista) {
    const grid = document.getElementById('grid-productos');
    if (!grid) return;
    grid.innerHTML = '';
    
    if(lista.length === 0) {
        grid.innerHTML = `<p class="no-found">No encontré ese artículo gamer.</p>`;
        return;
    }

    lista.forEach(p => {
        grid.innerHTML += `
            <div class="card Producto">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="card-body">
                    <h5>${p.nombre}</h5>
                    <p style="display:none">${p.precio}</p> 
                    <p class="precio-visible">$${p.precio.toLocaleString()}</p>
                    <a data-id="${p.id}"></a>
                    <button class="btn btn-primary">Agregar al carrito</button>
                </div>
            </div>
        `;
    });

    
    prepararBotones();
}


function prepararBotones() {
    const carrito_count = document.querySelector('.carrito-count');
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.onclick = (e) => {
            count++;
            if(carrito_count) carrito_count.textContent = count;
            
            button.textContent = "Producto agregado";
            button.classList.add('btn-success');
            
           
            const data = e.target.closest('.Producto');
            leerDatos(data);

            setTimeout(() => {
                button.textContent = "Agregar al carrito";
                button.classList.remove('btn-success');
            }, 1000);
        }
    });
}

function leerDatos(producto) {
    const infoProducto = {
        id: producto.querySelector('a').getAttribute('data-id'),
        img: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: parseInt(producto.querySelector('p').textContent),
        cantidad: 1
    }

    const existe = Totalcarrito.some(p => p.id === infoProducto.id);

    if (existe) {
        Totalcarrito = Totalcarrito.map(p => {
            if (p.id === infoProducto.id) { p.cantidad++; }
            return p;
        });
    } else {
        Totalcarrito.push(infoProducto);
    }
    
    MostrarCarrito();
}

function MostrarCarrito() {
    const tbody = document.querySelector('#lista-carrito tbody');
    const total_productos = document.querySelector('#total-carrito');
    let sumatotal = 0;
    
    if(!tbody) return;
    tbody.innerHTML = "";

    Totalcarrito.forEach(p => {
        const row = document.createElement('tr');
        let total = p.precio * p.cantidad;
        sumatotal += total;

        row.innerHTML = `
            <td><img src="${p.img}" width="50"></td>
            <td>${p.titulo}</td>
            <td>$${total.toLocaleString()}</td>
            <td>${p.cantidad}</td>
            <td><a href="#" class="eliminar" onclick="eliminarItem(${p.id})">X</a></td>
        `;
        tbody.appendChild(row);
    });
    
    if(total_productos) total_productos.textContent = `Total: $${sumatotal.toLocaleString()}`;
}

function eliminarItem(id) {
    Totalcarrito = Totalcarrito.filter(p => p.id != id);
    count = Totalcarrito.reduce((acc, p) => acc + p.cantidad, 0);
    document.querySelector('.carrito-count').textContent = count;
    MostrarCarrito();
}

function filtrarProductos(categoria) {
    const filtrados = (categoria === 'Todos') ? productosGamer : productosGamer.filter(p => p.categoria === categoria);
    cargarProductos(filtrados);
}

function buscarProducto() {
    const texto = document.getElementById('inputBusqueda').value.toLowerCase();
    const filtrados = productosGamer.filter(p => p.nombre.toLowerCase().includes(texto));
    cargarProductos(filtrados);
}


document.addEventListener('DOMContentLoaded', () => cargarProductos(productosGamer));