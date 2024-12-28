'use strict'
const container = document.querySelector(".container")


// Gets the grid-size
function gridSize(size) {
    let gridSize;
    let squareSize;
gridSize = size * size
squareSize = (800 / gridSize) * size

for (let square = 0; square < gridSize; square++) {
    container.innerHTML += `<div class="square"></div>`
    }

    document.querySelectorAll(".square").forEach((el) => {
        el.style.width = squareSize + "px"
        el.style.height = squareSize + "px"

        el.addEventListener("mouseenter", function() {
            el.style.backgroundColor = "blue"
        })
    })
}


gridSize(20)