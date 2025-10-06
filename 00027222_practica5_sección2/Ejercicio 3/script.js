const estanteria = {
    libros: [{
        nombre: 'El caballero oscuro',
        autor: 'Frank Miller',
        leido: false
    },
    {
        nombre: 'El mundo amarillo',
        autor: 'Albert Espinosa',
        leido: false,
    },
    {
        nombre: 'Harry Potter y el caliz de fuego',
        autor: 'J.K. Rowling',
        leido: true,
    },
    {
        nombre: 'El ingenioso hidalgo Don Quijote de la Mancha',
        autor: 'Miguel de Cervantes',
        leido: false
    },
    {
        nombre: 'Berserk',
        autor: 'Kentaro Miura',
        leido: true
    },
    {
        nombre: 'Iliada',
        autor: 'Homero',
        leido: false
    }],
    
    log() {
        const { libros } = this;
        let resultado = '';
        for (const libro of libros) {
            const prefijo = libro.leido ? 'Ya has' : 'Aun no has';
            resultado = `${resultado}
${prefijo} leído ${libro.nombre} de ${libro.autor}`;
        }
        console.log(resultado);
        return resultado;
    },
    
    sugerencia() {
        const librosNoLeidos = this.libros.filter(libro => !libro.leido);
        if (librosNoLeidos.length === 0) {
            return '¡Felicidades! Has leído todos los libros.';
        }
        const indiceRandom = Math.floor(librosNoLeidos.length * Math.random());
        const elementoRandom = librosNoLeidos[indiceRandom];
        const mensaje = `Te sugiero "${elementoRandom.nombre}" de ${elementoRandom.autor}`;
        console.log(mensaje);
        return mensaje;
    }
};

function mostrarLibros() {
    const resultado = estanteria.log();
    document.getElementById('resultado').innerHTML = 
        '<h2>Estado de Lectura:</h2><pre>' + resultado + '</pre>';
}

function obtenerSugerencia() {
    const sugerencia = estanteria.sugerencia();
    document.getElementById('resultado').innerHTML = 
        '<h2>Sugerencia:</h2><p>' + sugerencia + '</p>';
}