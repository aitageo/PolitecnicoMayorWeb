document.addEventListener("DOMContentLoaded",()=>{
  let Totalcarrito = [];
  let count = 0;

  const contenedor_carrito = document.getElementById('contenedor-carrito');
    const carrito_count = document.getElementsByClassName('carrito-count')[0];
    const carrito = document.querySelector('.carrito');
    
    const vaciarBtn = document.getElementById('vaciar-carrito');
    vaciarBtn.addEventListener('click', () => {
    Totalcarrito = [];
    count = 0;

    carrito_count.textContent = 0;

    document.querySelector('#lista-carrito tbody').innerHTML = "";
    document.querySelector('#total-carrito').textContent = "Total: $0";

    contenedor_carrito.style.display = "none";
  });
    
    carrito.addEventListener('mouseover', ()=>{
      contenedor_carrito.style.display = "block";
    })

    carrito.addEventListener('mouseout', ()=>{
      contenedor_carrito.style.display = "none";
  
    });
  
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button=>{
      button.addEventListener('click',(e)=>{
        e.preventDefault();

        count++
        carrito_count.textContent = count;
        
        const card = button.closest('.card')
        leerDatos(card);
        
        button.textContent = "Producto agregado";
        button.classList.remove('btn-primary')
        button.classList.add('btn-success');

        setTimeout(()=>{
          button.textContent = "Agregar al carrito";
          button.classList.add('btn-primary'); 
          button.classList.remove('btn-success');
        },1000)   
  
      })

      function leerDatos(producto){
        const infoProducto = {
          id : producto.querySelector('a').getAttribute('data-id'),
          img : producto.querySelector('img').src,
          titulo: producto.querySelector('h3').textContent,
          precio: parseInt(producto.querySelectorAll('p')[1].textContent.replace(/[^0-9]/g, '')), //en esta parte hace que elimina 
          // todo lo que no sea número y lo convierte string o numero entero
          cantidad : 1
        }

        const existe = Totalcarrito.some(producto=>{
          return producto.id === infoProducto.id
  
        });
  
        if (existe) {
          Totalcarrito = Totalcarrito.map(producto=>{
            if (producto.id == infoProducto.id) {
              producto.cantidad++
            }
  
            return producto; 
  
          })
  
        } else {
  
          Totalcarrito.push(infoProducto);
  
        }
  
        MostarCarrito(Totalcarrito); 
  
      }
    
      function MostarCarrito(Totalcarrito){
        ocultarCarrito();
        const tbody = document.querySelector('#lista-carrito tbody');
        const total_productos = document.querySelector('#total-carrito');
        let sumatotal = 0
        tbody.innerHTML = "";
        Totalcarrito.forEach(producto=>{
          const row = document.createElement('tr');
          let total = producto.precio * producto.cantidad
          row.innerHTML = `
          <td><img src="${producto.img}" width="50"></td>
          <td>${producto.titulo}</td>
          <td>$${total}</td>
          <td>${producto.cantidad}</td>
          <td><a href="#" class="eliminar" data-id="${producto.id}">X</a></td>
          `;
  
          sumatotal += total;
  
          const eliminar = row.querySelector('.eliminar');
          eliminar.addEventListener("click",(e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            EliminarDelCarrito(id);
  
          });
          tbody.appendChild(row);
  
        });
  
        total_productos.textContent = `Total: $${sumatotal}`;
  
      }
      function EliminarDelCarrito(id){
        console.log(id);
        Totalcarrito = Totalcarrito.map( (producto)=>{
          if(producto.id === id){
            producto.cantidad--
  
          }
          return producto
  
        }).filter(producto=>producto.cantidad > 0);
  
        MostarCarrito(Totalcarrito);
        count--
        carrito_count.textContent = count;
  
      }
  
    })
  
    function ocultarCarrito(){
      if (Totalcarrito.length === 0) {
        contenedor_carrito.style.display = "none";
  
      }
      else {
        contenedor_carrito.style.display = "block";
  
      }
  
    }
  
  })

  const vaciarBtn = document.getElementById('vaciar-carrito');

  vaciarBtn.addEventListener('click', () => {
    Totalcarrito = [];
    count = 0;

    carrito_count.textContent = 0;

    document.querySelector('#lista-carrito tbody').innerHTML = "";
    document.querySelector('#total-carrito').textContent = "Total: $0";

    contenedor_carrito.style.display = "none";
  
  })









