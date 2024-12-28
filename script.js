'use strict'
const container = document.querySelector(".container")
const btn = document.querySelector(".userInput")
const rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
let enableRainbow;
let enableDarken;

enableRainbow = true;
// Random color from rainbow
function RandColor() {
    return rainbow[Math.floor(Math.random() * rainbow.length)]
}

function darken(target) {
    
    const shade = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(transparent, transparent)`
    
    if (target.style.backgroundImage === "") {
        return target.style.backgroundImage = shade
    } else {
        let increase = Number(target.style.backgroundImage.split(",")[3].split(")")[0])
        if (isNaN(increase)) return
        increase += 0.1
        console.log(increase);
        return target.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${increase += 0.1}), rgba(0, 0, 0, ${increase += 0.1})), linear-gradient(transparent, transparent)`
    }
  
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

        el.addEventListener("mouseenter", function(el) {
            if (enableRainbow === true) el.target.style.backgroundColor = `${RandColor()}`
            else el.target.style.backgroundColor = "black"
            darken(el.target);
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
