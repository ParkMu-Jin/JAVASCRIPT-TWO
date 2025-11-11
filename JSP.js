//ALDHAIR.html
let studentData = [];

function generateStudentForms() {
    const numStudents = parseInt(document.getElementById('numStudents').value);

    if (!numStudents || numStudents < 1 || numStudents > 1000) {
        alert('Por favor ingrese un número válido entre 1 y 1000');
        return;
    }

    const container = document.getElementById('studentsContainer');
    container.innerHTML = '';
    studentData = [];

    for (let i = 1; i <= numStudents; i++) {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
                    <h3>Estudiante ${i}</h3>
                    <div class="grades-input">
                        <div class="grade-field">
                            <label>Nota 1:</label>
                            <input type="number" id="nota1_${i}" min="0" max="100" step="0.01" placeholder="0-100">
                        </div>
                        <div class="grade-field">
                            <label>Nota 2:</label>
                            <input type="number" id="nota2_${i}" min="0" max="100" step="0.01" placeholder="0-100">
                        </div>
                    </div>
                `;
        container.appendChild(studentCard);
    }

    container.classList.remove('hidden');
    document.getElementById('calculateButtonContainer').classList.remove('hidden');
    document.getElementById('resultsContainer').classList.add('hidden');
}

function calculateAverages() {
    const numStudents = parseInt(document.getElementById('numStudents').value);
    const results = [];
    let hasError = false;

    for (let i = 1; i <= numStudents; i++) {
        const nota1 = parseFloat(document.getElementById(`nota1_${i}`).value);
        const nota2 = parseFloat(document.getElementById(`nota2_${i}`).value);

        if (isNaN(nota1) || isNaN(nota2)) {
            alert(`Por favor complete todas las notas del Estudiante ${i}`);
            hasError = true;
            break;
        }

        if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100) {
            alert(`Las notas del Estudiante ${i} deben estar entre 0 y 100`);
            hasError = true;
            break;
        }

        const promedio = (nota1 + nota2) / 2;
        results.push({
            estudiante: i,
            nota1: nota1,
            nota2: nota2,
            promedio: promedio.toFixed(2)
        });
    }

    if (!hasError) {
        displayResults(results);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '<h2>Resultados</h2>';

    results.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
                    <div>
                        <div class="student-name">Estudiante ${result.estudiante}</div>
                        <div class="grades-detail">
                            Nota 1: ${result.nota1} | Nota 2: ${result.nota2}
                        </div>
                    </div>
                    <div class="average">Promedio: ${result.promedio}</div>
                `;
        resultsContainer.appendChild(resultCard);
    });

    resultsContainer.classList.remove('hidden');
}

//CALDERON.html
// Función para obtener el día de la semana según el número ingresado
function obtenerDia(numero) {
    // Array con los días de la semana
    const dias = [
        "lunes", 
        "martes", 
        "miércoles", 
        "jueves", 
        "viernes", 
        "sábado", 
        "domingo"
    ];
    
    // Verificar si el número está en el rango válido (1-7)
    if (numero >= 1 && numero <= 7) {
        // Restamos 1 porque los arrays en JavaScript empiezan en 0
        return dias[numero - 1];
    } else {
        // Retornamos null si el número está fuera del rango
        return null;
    }
}

// Función para validar que sea un número entero
function validarNumeroEntero(valor) {
    // Verificar que sea un número y que sea entero
    return !isNaN(valor) && Number.isInteger(parseFloat(valor));
}

// Función para mostrar el resultado en la página
function mostrarResultado() {
    // Obtener el valor del campo de entrada
    const numeroInput = document.getElementById('numeroDia').value;
    
    // Obtener el elemento donde mostraremos el resultado
    const resultadoElemento = document.getElementById('resultado');
    
    // Verificar si el campo está vacío
    if (numeroInput === '') {
        resultadoElemento.textContent = "Por favor, ingrese un número.";
        resultadoElemento.className = "result error";
        return;
    }
    
    // Verificar si el valor ingresado es un número entero válido
    if (!validarNumeroEntero(numeroInput)) {
        resultadoElemento.textContent = "Por favor, ingrese un número entero válido (sin decimales).";
        resultadoElemento.className = "result error";
        return;
    }
    
    // Convertir el valor a número entero
    const numero = parseInt(numeroInput);
    
    // Obtener el día correspondiente
    const dia = obtenerDia(numero);
    
    // Mostrar el resultado según si se encontró un día válido o no
    if (dia) {
        // Capitalizar la primera letra del día
        const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1);
        resultadoElemento.textContent = `El día correspondiente es ${diaCapitalizado}`;
        resultadoElemento.className = "result success";
    } else {
        resultadoElemento.textContent = "Ha digitado un número fuera del rango permitido (1-7)";
        resultadoElemento.className = "result error";
    }
}

// Función para limitar la entrada a un solo dígito
function limitarEntrada(event) {
    const input = event.target;
    // Remover cualquier carácter que no sea dígito
    input.value = input.value.replace(/[^0-9]/g, '');
    
    // Limitar a un solo dígito
    if (input.value.length > 1) {
        input.value = input.value.slice(0, 1);
    }
}

// Agregar el evento al botón para que ejecute la función al hacer clic
document.getElementById('btnCalcular').addEventListener('click', mostrarResultado);

// Agregar evento para limitar la entrada a un solo dígito
document.getElementById('numeroDia').addEventListener('input', limitarEntrada);

// También permitir que se ejecute al presionar Enter en el campo de entrada
document.getElementById('numeroDia').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        mostrarResultado();
    }
});

// Limpiar el campo cuando se enfoque
document.getElementById('numeroDia').addEventListener('focus', function() {
    this.value = '';
});

//MATOS AND JOSE
function calcularPromedio() {
    // 1. Obtener los valores de los inputs
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    // Elementos para mostrar los resultados
    const promedioSpan = document.getElementById('promedio');
    const calificacionLetraSpan = document.getElementById('calificacionLetra');

    // 2. Validar las entradas
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert('Por favor, ingrese las tres notas.');
        promedioSpan.textContent = '';
        calificacionLetraSpan.textContent = '';
        return;
    }

    if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100) {
        alert('Por favor, ingrese notas válidas en el rango de 0 a 100.');
        promedioSpan.textContent = '';
        calificacionLetraSpan.textContent = '';
        return;
    }

    // 3. Calcular el promedio
    const promedio = (nota1 + nota2 + nota3) / 3;

    // 4. Determinar la calificación en letra
    let calificacionLetra = '';
    if (promedio >= 90) {
        calificacionLetra = 'A';
    } else if (promedio >= 80) {
        calificacionLetra = 'B';
    } else if (promedio >= 70) {
        calificacionLetra = 'C';
    } else if (promedio >= 60) {
        calificacionLetra = 'D';
    } else {
        calificacionLetra = 'F';
    }

    // 5. Mostrar los resultados en la página
    // toFixed(2) para mostrar el promedio con 2 decimales
    promedioSpan.textContent = promedio.toFixed(2);
    calificacionLetraSpan.textContent = calificacionLetra;
}
function generarCamposDePrecio() {
    const cantidad = parseInt(document.getElementById('cantidadProductos').value);
    const camposDiv = document.getElementById('camposPrecios');
    const resultadoDiv = document.getElementById('resultadoTotal');

    // Limpiar contenido previo
    camposDiv.innerHTML = '';
    resultadoDiv.innerHTML = '';

    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor, ingrese una cantidad válida de productos.');
        return;
    }

    // Generar los campos para cada producto
    for (let i = 1; i <= cantidad; i++) {
        const label = document.createElement('label');
        label.textContent = `Ingrese el precio del producto ${i}: `;

        const input = document.createElement('input');
        input.type = 'number';
        input.id = `precioProducto${i}`;
        input.className = 'precio-producto'; // Clase para seleccionarlos fácilmente
        input.min = '0.01';
        input.step = '0.01';
        
        camposDiv.appendChild(label);
        camposDiv.appendChild(input);
        camposDiv.appendChild(document.createElement('br'));
        camposDiv.appendChild(document.createElement('br'));
    }

    // Añadir el botón para calcular el total
    if (cantidad > 0) {
        const botonCalcular = document.createElement('button');
        botonCalcular.textContent = 'Calcular Total';
        botonCalcular.onclick = calcularTotal;
        camposDiv.appendChild(botonCalcular);
    }
}

function calcularTotal() {
    const camposPrecios = document.getElementsByClassName('precio-producto');
    let total = 0;

    for (let i = 0; i < camposPrecios.length; i++) {
        const precio = parseFloat(camposPrecios[i].value);
        if (!isNaN(precio) && precio > 0) {
            total += precio;
        }
    }

    const resultadoDiv = document.getElementById('resultadoTotal');
    resultadoDiv.textContent = `El total a pagar es: ${total.toFixed(2)}`;
}
