//Formas de acceder a los Elementos//
// const carrito = document.querySelector("#carrito");//Con querySelector puedes acceder a clases y Ids
// console.log(carrito);

// const carrito = document.getElementById("carrito");

// const carrito = document.getElementsByTagName('span')
// console.log(carrito);

//Eventos de javascript
//Eventos del mouse
//Listeners: Es poner algo 
//Evento click
document.addEventListener('DOMContentLoaded', ()=>{
  const lista_carrito = document.getElementById('lista-carrito');
  let totalCarrito = [];
  let count = 0;
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach( (button)=>{
    button.addEventListener('click', (e)=>{      
      e.preventDefault();
      const carrito_count = document.getElementsByClassName('carrito-count')[0];
      console.log(carrito_count);
      
      count++
      carrito_count.textContent = count;
      button.textContent = "Producto agregado"
      button.classList.remove('btn-primary')
      button.classList.add('btn-success')
      setTimeout(()=>{
        button.classList.remove('btn-success')
        button.classList.add('btn-primary')  
        button.textContent = "Agregar al carrito"
      },2000)
      //Esto se llama el traversing del dom
      const data = e.target.closest('.Producto')//el closest busca la clase mas cercana      
      leerDatos(data)
    //  cargarProductos(data)  
    })

   function leerDatos(producto){

    const infoProducto = {
      imagen : producto.querySelector('img').src,
      titulo : producto.querySelector('h5').textContent, //es el contenido del texto
      precio : parseInt(producto.querySelector('.precio').textContent),//parseint es para convertir texto a numero
      id : producto.querySelector('a').getAttribute('data-id'),
      cantidad : 1,
    }

    // totalCarrito.push(infoProducto);
    const existe = totalCarrito.some(producto=>producto.id === infoProducto.id);
    if (existe){
      totalCarrito = totalCarrito.map((producto)=>{
        if (producto.id === infoProducto.id) {
          producto.cantidad++
          // console.log(producto);
          
        }
        return producto
      })
    }else {
      totalCarrito.push(infoProducto);
      console.log(totalCarrito);

    }
    
    
   }

  
  })
  



  

})   









