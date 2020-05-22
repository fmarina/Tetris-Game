document.addEventListener('DOMContentLoaded', () => {

    crearGrid(200);

});

function crearGrid(cant) {
    const grid = document.getElementById("grid");
    for(let i = 0; i < cant; i++) {
        const div = document.createElement("div");
        grid.appendChild(div);
    }
}