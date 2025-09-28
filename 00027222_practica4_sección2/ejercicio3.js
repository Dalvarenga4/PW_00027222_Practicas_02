function ordenar(arr) {
    const muevoArray = [...arr]
    for (let i = 0; i < muevoArray.length ; i++) {
    for(let j = 0 ; j < muevoArray.length - i - 1; j++) {
    if (muevoArray[j] > muevoArray[j + 1]) {
    let temporal = muevoArray[j];
    muevoArray[j] = muevoArray[j+1];
    muevoArray[j + 1] = temporal;
    }
    }
    }
    return muevoArray;
}

console.log(ordenar([14, 23, 99, 874, 93, 121]));

function esPar (numero) {
    return numero % 2 === 0;
}

console.log(esPar(7));

function calcularDiasCrecimiento(velocidadCrecimiento, velocidadDecrecimiento, alturaDescada) {
    let altura = 0;
    let dias = 0;
    while (altura < alturaDescada) {
    altura += velocidadCrecimiento;
    dias++;
    if (altura >= alturaDescada) { return dias }
    altura -= velocidadDecrecimiento;
    }
    return dias;
}