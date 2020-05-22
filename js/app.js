document.addEventListener('DOMContentLoaded', () => {

    crearGrid(210);
    const grid = document.querySelector("#grid");
    let squares = Array.from(document.querySelectorAll("#grid div"));
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
        [0, 1, 10, 11],
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

    // Hace que la figura del tetris baje cada 1 segundo. Se asigna a la variable timerId para que luego se pueda frenar
    timerId = setInterval(moverHaciaAbajo, 1000);

    document.addEventListener("keydown", keyEvent);

    function keyEvent(e) {
        switch(e.keyCode) {
            case 37: moverHaciaIzquierda(); break;
            case 38: moverHaciaArriba(); break;
            case 39: moverHaciaDerecha(); break;
            case 40: moverHaciaAbajo(); break;
        }
    }

    // Verifica que el siguiente espacio hacia abajo de cada cuadrado si contiene una clase "no-disponible", se converitra cada uno de los cuadrados de la figuraTetris en un cuadrado con la clase "no-disponible"
    function chequearEspacioAbajo() {
        if(posicionFiguraTetris.some(indexShape => squares[posicionInicial + indexShape + 10]
            .classList.contains("no-disponible"))) {
                posicionFiguraTetris.forEach(indexShape => 
                    squares[posicionInicial + indexShape].classList.add("no-disponible"));
                console.log("se cambio a no disponible");
            // Una nueva figura aleatoria del tetris va a bajar 
            random = Math.floor(Math.random() * tetris.length);
            posicionFiguraTetris = tetris[random][rotacionActual]
            posicionInicial = 3;
            dibujar();
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