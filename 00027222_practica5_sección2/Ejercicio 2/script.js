const carrito = {
    productos: [{
        nombre: 'papel higiénico',
        unidades: 4,
        precio: 5,
    },
    {
        nombre: 'chocolate',
        unidades: 2,
        precio: 1.5
    }],
    
    get precioTotal() {
        let precio = 0;
        for (let i = 0; i < this.productos.length; i++) {
            precio += this.productos[i].unidades * this.productos[i].precio;
        }
        return precio;
    }
};

// Mostrar resultados en la página
const resultadoDiv = document.getElementById('resultado');
let contenidoHTML = '<h2>Productos en el carrito:</h2><ul>';

carrito.productos.forEach(producto => {
    contenidoHTML += `
        <li>
            ${producto.nombre} - ${producto.unidades} unidades x $${producto.precio} = $${producto.unidades * producto.precio}
        </li>
    `;
});

contenidoHTML += `</ul><h3>Precio Total: $${carrito.precioTotal}</h3>`;
resultadoDiv.innerHTML = contenidoHTML;

console.log('Precio total del carrito:', carrito.precioTotal);