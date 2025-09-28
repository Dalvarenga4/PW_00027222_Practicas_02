function obtenerActividad(dia) {
    const actividades = {
        'lunes': 'atender un cliente específico',
        'martes': 'visitar una agencia fuera de la ciudad',
        'miercoles': 'llevar a mi hija al ballet (balé)',
        'jueves': 'priorizar entregas de desarrollo',
        'viernes': 'atender problemas de manera remota',
        'sabado': 'hacer lo que mi esposa quiera',
        'domingo': 'día de descanso - no hay actividades programadas'
    };
    
    return actividades[dia.toLowerCase()] || 'día no válido';
}

function mostrarRecordatorio() {
    const diaSelect = document.getElementById('diaSelect');
    const resultadoDiv = document.getElementById('resultado');
    const dia = diaSelect.value;
    
    if (!dia) {
        resultadoDiv.innerHTML = '<p style="color: #dc3545;">Por favor, selecciona un día de la semana</p>';
        return;
    }
    
    const actividad = obtenerActividad(dia);
    const diaFormateado = dia.charAt(0).toUpperCase() + dia.slice(1);
    
    resultadoDiv.innerHTML = `
        <p>Hoy es <span class="dia">${diaFormateado}</span> y tu actividad es: </p>
        <p class="actividad">${actividad}</p>
    `;
}