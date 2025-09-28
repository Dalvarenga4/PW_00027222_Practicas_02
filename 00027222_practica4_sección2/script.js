// Comprueba que si aserción es verdadera
console.assert("Legolas" > "Gimli");

// Limpia la consola
console.clear();

// Lista de forma interactiva las propiedades de un objeto
console.dir(Window);

// Muestra una representación HTML del objeto
console.dirxml(document.body);

const marvel = ['Spider Man', 'Iron Man', 'Capitan America', 'Lobezno'];

// Permite agrupar diferentes valores
console.group('Superhéroes de Marvel'); // O groupCollapsed
marvel.forEach(superhero => console.log(superhero));

// Indica el fin del grupo
console.groupEnd();