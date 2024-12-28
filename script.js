'use strict'
const container = document.querySelector(".container")
const btn = document.querySelector(".userInput")
const rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]


// Random color from rainbow
function RandColor() {
    return rainbow[Math.floor(Math.random() * rainbow.length)]
}


// Gets the grid-size
function gridSize(size) {
    if (size > 50) {
        alert("This is too much for the browser to handle! Max is 50.")
        return
    }
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
            el.style.backgroundColor = "black"
        })
    })
}

btn.addEventListener("click", function() {
   const input = window.prompt("Please type in how big you would like the grid!", "16")
   let values = "0123456789"
   let allow;

   input.split("").forEach((i) => {
    if(values.includes(i)) {
        allow = true;
    } else {
        allow = false;
    }
})
   if (allow) {
       container.innerHTML = ""
       gridSize(input)
   } else window.alert("Not a number!!!")
})
