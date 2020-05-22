document.addEventListener('DOMContentLoaded', () => {

    crearGrid(200);
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
    let posicionFiguraTetris = tetris[0][0];

    dibujar();    

    // Dibujamos Tetris Shapes
    function dibujar() {
        posicionFiguraTetris.forEach(indexShape => {            
            squares[posicionInicial + indexShape].classList.add('figura-tetris');  
        });

    }

});

function crearGrid(cant) {
    const grid = document.getElementById("grid");
    for(let i = 0; i < cant; i++) {
        const div = document.createElement("div");
        div.textContent = [i];
        grid.appendChild(div);
    }
}