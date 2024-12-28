'use strict'
const container = document.querySelector(".container")
const btn = document.querySelector(".userInput")
const rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
let enableRainbow;
let enableDarken;
let enableRed;
let enableBlue;
let enableCustomColor;
let hexColorCode;
let allowDrawing = false;
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
            if (allowDrawing === false) return
            // Checks if darken is enabled
            if (enableDarken === true) darken(el.target)

            // Checks if rainbow is enabled
            if (enableRainbow === true) el.target.style.backgroundColor = `${RandColor()}`
            if (enableRed === true) el.target.style.backgroundColor = "red"
            if (enableBlue === true) el.target.style.backgroundColor = "blue"
            if (enableCustomColor === true) el.target.style.backgroundColor = `${hexColorCode}`

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
    revealBtns = true;
    btn.insertAdjacentHTML("afterend", `<div class="btnsContainer"><button class="redBtn btnSel">Red</button><button class="blueBtn btnSel">Blue</button><button class="customBtn btnSel">Custom Color</button><button class="rainbowBtn btnSel">Rainbow</button><button class="darkenBtn btnSel">Darken</button></div>`)
    const redBtn = document.querySelector(".redBtn")
    const blueBtn = document.querySelector(".blueBtn")
    const customBtn = document.querySelector(".customBtn")
    const rainbowBtn = document.querySelector(".rainbowBtn")
    const darkenBtn = document.querySelector(".darkenBtn")

    redBtn.addEventListener("click", function() {
        enableBlue = false
        enableRainbow = false;
        enableCustomColor = false
        if (enableRed === true) return enableRed = false
        enableRed = true
    })
    blueBtn.addEventListener("click", function() {
        enableRed = false
        enableRainbow = false;
        enableCustomColor = false
        if (enableBlue === true) return enableBlue = false
        enableBlue = true
        
    })
    customBtn.addEventListener("click", function() {
        const regex = /#[\da-f]{6}/i;
        console.log(regex);
        const colorInput = window.prompt("Type in a hex color code!", "#ffffff")
        if (regex.test(colorInput)) {
           hexColorCode = colorInput
        }
        enableRed = false
        enableBlue = false
        enableRainbow = false
        if (enableCustomColor === true) return enableCustomColor = false
        enableCustomColor = true
    })
    rainbowBtn.addEventListener("click", function() {
        enableRed = false
        enableBlue = false
        enableCustomColor = false
        if (enableRainbow === true) return enableRainbow = false
        enableRainbow = true;
        
    })
    darkenBtn.addEventListener("click", function() {
        enableRed = false
        enableBlue = false
        enableRainbow = false
        enableCustomColor = false
        if (enableDarken === true) return enableDarken = false
        enableDarken = true;
    })
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
    allowDrawing = true;
            // Checks if darken is enabled
            if (enableDarken === true) darken(el.target)

            // Checks if rainbow is enabled
            if (enableRainbow === true) el.target.style.backgroundColor = `${RandColor()}`
            
            if (enableRed === true) el.target.style.backgroundColor = "red"
            if (enableBlue === true) el.target.style.backgroundColor = "blue"
            if (enableCustomColor === true) el.target.style.backgroundColor = `${hexColorCode}`
    console.log('test');
})
document.querySelector("body").addEventListener("mouseup", function() {
    allowDrawing = false;
})
document.querySelector("body").addEventListener("mouseleave", function() {
    allowDrawing = false;
})