document.addEventListener('DOMContentLoaded', () => {

    crearGrid(210);
    crearMiniGrid(42);
    const grid = document.querySelector("#grid");
    let squares = Array.from(document.querySelectorAll("#grid div"));
    let proximoAleatorio = 0;
   
    // Shapes
    const lShape = [
        [1, 2, 11, 21],
        [10, 11, 12, 22],
        [1, 11, 20, 21],
        [10, 20, 21, 22]
    ];
    const zShape = [
        [11, 12, 20, 21],
        [0, 10, 11, 21],
        [10, 11, 21, 22],
        [2, 11, 12, 21]
    ];
    const tShape = [
        [1, 10, 11, 12],
        [1, 11, 12, 21],
        [1, 10, 11, 21],
        [10, 11, 12, 21]
    ];
    const oShape = [
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11]
    ];
    const iShape = [
        [1, 11, 21, 31],
        [10, 11, 12, 13],
        [1, 11, 21, 31],
        [10, 11, 12, 13]
    ];

    const tetris = [lShape, zShape, tShape, oShape, iShape];

    // El array de rotacion comienza en el square con el indice 3
    let posicionInicial = 3;

    // Seleccionamos la primera rotacion de la figura del tetris. Ejemplo tShape[0]
    let rotacionActual = 0

    // selecciona la figura del tetris aleatoriamente
    let figuraRandom = Math.floor(Math.random() * tetris.length); // 0 1 2 3 4   
    
    let posicionFiguraTetris = tetris[figuraRandom][rotacionActual];

    // Dibujamos Tetris Shapes
    function dibujar() {
        posicionFiguraTetris.forEach(indexShape => {            
            squares[posicionInicial + indexShape].classList.add('figura-tetris');  
        });
    }

    // Desdibujamos tetris eliminandole la clase puesta en dibujar()
    function desdibujar() {
        posicionFiguraTetris.forEach(indexShape => {
            squares[posicionInicial + indexShape].classList.remove('figura-tetris');
        });
    }

    function keyEvent(e) {
        switch(e.keyCode) {
            case 37:  moverHaciaIzquierda(); break;
            case 38:  rotarFigura();         break;
            case 39:  moverHaciaDerecha();   break;
            case 40:  moverHaciaAbajo();     break;
        }
    }

    document.addEventListener("keydown", keyEvent);

    // Verifica que el siguiente espacio hacia abajo de cada cuadrado si contiene una clase "no-disponible", se converitra cada uno de los cuadrados de la figuraTetris en un cuadrado con la clase "no-disponible"
    function chequearEspacioAbajo() {
        if(posicionFiguraTetris.some(indexShape => 
            squares[posicionInicial + indexShape + 10]
            .classList.contains("no-disponible"))) {
                posicionFiguraTetris.forEach(indexShape => 
                    squares[posicionInicial + indexShape].classList.add("no-disponible"));
            // Una nueva figura aleatoria del tetris va a bajar
            figuraRandom = proximoAleatorio;
            proximoAleatorio = Math.floor(Math.random() * tetris.length);
            posicionFiguraTetris = tetris[figuraRandom][rotacionActual]
            posicionInicial = 3;
            dibujar();      
            mostrarProximaFigura();   
            agregarPuntaje();   
        }        
    }

    function moverHaciaAbajo() {
        desdibujar();
        posicionInicial += 10; //PosicionInicial que era 3 ahora es 13, 23, 33 y asi va bajando
        dibujar();
        chequearEspacioAbajo();
    }
   
    // Mueve hacia la izquierda, chequeando si existe el borde o un bloqueo para mover la figura 
    function moverHaciaIzquierda() {
        // Desdibujamos cualquier rastro de la figuraTetris en su ubicaciones actual antes de comenzar para que tengamos una pizarra limpia
        desdibujar();
        //Dividimos cada index del square donde esta posicionado la figuraTetris por 10. Si nos das exactamente 0 como resto significa que esta en el borde izquierdo
        const estaEnBordeIzquierdo = posicionFiguraTetris.some(indexShape =>
            (posicionInicial + indexShape) % 10 === 0);

        if(!estaEnBordeIzquierdo) posicionInicial -=1;

        //Verificamos que no haya una pieza en el lado izquierdo donde nos queremos mover. Si hay lo empujamos hacia atrás un espacio para que parezca que no se ha movido
        if(posicionFiguraTetris.some(indexShape => 
            squares[posicionInicial + indexShape].classList.contains("no-disponible"))) {
                posicionInicial += 1;
        }
        //re dibujamos la figura en su nueva posicion      
        dibujar();  
    }

    // Mueve hacia la derecha, chequeando si existe el borde o un bloqueo para mover la figura 
    function moverHaciaDerecha() {
        desdibujar();
        const estaEnBordeDerecho = posicionFiguraTetris.some(indexShape => 
            (posicionInicial + indexShape) % 10 === 10 - 1);

        if(!estaEnBordeDerecho) posicionInicial += 1;

        if(posicionFiguraTetris.some(indexShape => squares[posicionInicial + indexShape]
            .classList.contains("no-disponible"))) {
                posicionInicial -= 1;
        }
        dibujar();
    }

    function rotarFigura() {
        desdibujar();
        rotacionActual ++; // incrementa para mover hacia el siguiente item en nuestro array
        // Si el indice de rotacionActual es igual a la cantidad de rotaciones en nuestra figura actual, volvemos al primer item en nuestro array que es la primera rotacion. Es decir si la rotacionActual obtiene 4 vuelve a 0

        if(rotacionActual === posicionFiguraTetris.length) { 
                rotacionActual = 0; 
        } 
        // Si es false simplemente pasamos esa nueva rotacionActual a el contador de tetris
        posicionFiguraTetris = tetris[figuraRandom][rotacionActual];
        dibujar(); // volvemos a dibujar
    }

    // Muestra cual es la proxima figura de tetris que aparecerá en el mini-grid
    const squaresMiniGrid = document.querySelectorAll("#mini-grid div");
    let displayIndex = 2;
    
    //figuras de tetris sin rotacion
    const proximaFiguraTetris = [
        [1, 2, 8, 15],  // L
        [8, 9, 14, 15], // Z
        [1, 7, 8, 9],   // T
        [0, 1, 7, 8],   // O
        [1, 8, 15, 22]  // |
    ];

    // mostrar proxima figura tetris en mini-grid
    function mostrarProximaFigura() {
        // eliminar cualquier rastro de figura tetris de toda la cuadrícula
        squaresMiniGrid.forEach(square => { square.classList.remove("figura-tetris") });
        //La proxima figura que aparezca se le asigna la clase figura-tetris.
        proximaFiguraTetris[proximoAleatorio].forEach(indexShape => {
            squaresMiniGrid[displayIndex + indexShape].classList.add("figura-tetris");
        });
    }

    let startButton = document.getElementById("start-btn");
    let timerId;

    startButton.addEventListener('click', () => {
        // si el timerId no es null, pausamos el juego y definimos timerId en null
        if(timerId) {
            clearInterval(timerId);
            timerId = null;
        }
        else {
            // si es null, start juego, dibujamos la figura del tetris en la posicion actual predeterminada
            dibujar();
            timerId = setInterval(moverHaciaAbajo, 1000);
            figuraRandom = Math.floor(Math.random() * tetris.length);
            mostrarProximaFigura();
        }
    });

    /* Cuando el usuario logra llenar una fila completa con figuras tetris, tenemos que 
    - incrementar el puntaje
    - mostrar la puntuación en nuestro navegador 
    - eliminar la fila de nuestro grid.
    - agregar una nueva fila nueva a nuestro grid para que no parezca encogerse de tamaño
    */
    let mostrarPuntaje = document.querySelector(".score");
    let puntaje = 0;
    
    function agregarPuntaje() {
        for (let i = 0; i < 199; i += 10) {
            const filaCompleta = [ 
                i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9
            ];
            
            if(filaCompleta.every(index => squares[index].classList.contains("no-disponible")))
            {
                puntaje += 10;
                mostrarPuntaje.innerHTML = puntaje
                
                filaCompleta.forEach(index => {                    
                    squares[index].classList.remove("no-disponible");
                    squares[index].classList.remove("figura-tetris");
                });
                
                const filaEliminada = squares.splice(i, 10); // eliminamos la fila completa
                console.log("filaEliminada", filaEliminada);
                // appendeamos con concat esos diez squares eliminados de filaEliminada.
                squares = filaEliminada.concat(squares);
                squares.forEach(celda => grid.appendChild(celda));

            }
        }
    }

});

function crearGrid(cant) {
    const grid = document.getElementById("grid");
    for(let i = 0; i < cant; i++) {
        const div = document.createElement("div");
        if(i > 199) div.className = "no-disponible";
        div.textContent = [i];
        grid.appendChild(div);
    }
}

function crearMiniGrid(cant) {
    const mini_grid = document.getElementById("mini-grid");
    for(let i = 0; i < cant; i++) {
        const div = document.createElement("div");
        div.textContent = i;
        mini_grid.appendChild(div);
    }
}