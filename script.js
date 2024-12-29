'use strict'
const container = document.querySelector(".container")
const btn = document.querySelector(".userInput")
let btnsContainer;
const rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
let enableRainbow;
let enableDarken;
let enableRed;
let enableBlue;
let enableEraser;
let enableCustomColor;
let hexColorCode = "#ffffff"
let enableDrawing = false;
let revealBtns = false;

// Enable rainbow

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
            if (enableDrawing === false) return
            startDrawing(el);
        })
    })
}

function startDrawing(el) {
    // Checks if darken is enabled
    if (enableDarken) darken(el.target)

        // Checks if rainbow is enabled
        if (enableRainbow) el.target.style.backgroundColor = `${RandColor()}`
        
        if (enableRed) el.target.style.backgroundColor = "red"
        if (enableBlue) el.target.style.backgroundColor = "blue"
        if (enableCustomColor) el.target.style.backgroundColor = `${hexColorCode}`
        if (enableEraser) {
            el.target.style.backgroundColor = "white"
            el.target.style.backgroundImage = ""
        }
}

function disableAllButSelected(el) {
 
    const selected = el.innerHTML.toLowerCase();
    el.classList.toggle("btnEnabled")
    

   switch (selected) {
       case "red":
           enableRed = !enableRed; // Toggle red
           break;
       case "blue":
           enableBlue = !enableBlue; // Toggle blue
           break;
       case "rainbow":
           enableRainbow = !enableRainbow; // Toggle rainbow
           break;
       case "custom color":
           if (!enableCustomColor) {
           const regex = /^#[\da-f]{6}$/i;
           const colorInput = window.prompt("Type in a hex color code!", hexColorCode)
           if (regex.test(colorInput)) {
               hexColorCode = colorInput
           } else return window.alert("Invalid Hex Code!")
       }
           enableCustomColor = !enableCustomColor; // Toggle custom color
           break;
       case "darken":
           enableDarken = !enableDarken; // Toggle darken
           break;
       case "eraser":
           enableEraser = !enableEraser; // Toggle eraser
           break;
   }

   if (enableRed || enableBlue || enableRainbow || enableCustomColor || enableDarken || enableEraser) {
       enableRed = selected === "red" ? enableRed : false;
       enableBlue = selected === "blue" ? enableBlue : false;
       enableRainbow = selected === "rainbow" ? enableRainbow : false;
       enableCustomColor = selected === "custom color" ? enableCustomColor : false;
       enableDarken = selected === "darken" ? enableDarken : false;
       enableEraser = selected === "eraser" ? enableEraser : false;
   }

}

function addEventsToButtons() {
    revealBtns = true;
    btn.insertAdjacentHTML("afterend", `<div class="btnsContainer"><button class="redBtn btnSel">Red</button><button class="blueBtn btnSel">Blue</button><button class="customBtn btnSel">Custom Color</button><button class="rainbowBtn btnSel">Rainbow</button><button class="darkenBtn btnSel">Darken</button><button class="eraseBtn btnSel">Eraser</button></div>`)
    btnsContainer = document.querySelectorAll(".btnSel")



   

btnsContainer.forEach((btn) => {
    
    btn.addEventListener("click", function(el){
        btnsContainer.forEach((btn) => {
            btn.classList.remove("btnEnabled")
        })
        disableAllButSelected(el.target)
    })
})

}


btn.addEventListener("click", function() {
   const input = window.prompt("Please type in how big you would like the grid!", "16")
   let values = "0123456789"
   let allow;

   console.log(input);
   if (input === null) return
   if (revealBtns === false) {
    addEventsToButtons();
   }
   
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

container.addEventListener("mousedown", function(el) {
    if (el.target.classList.value !== "square") return
    enableDrawing = true;
            startDrawing(el);
})
document.querySelector("body").addEventListener("mouseup", function() {
    enableDrawing = false;
})
document.querySelector("body").addEventListener("mouseleave", function() {
    enableDrawing = false;
})