
const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d")

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30
let posSnake = [10,3]

canvas.witdh = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT


ctx.scale(BLOCK_SIZE, BLOCK_SIZE)



let mapaArray = crearMapa(BOARD_WIDTH, BOARD_HEIGHT)



function crearMapa(B_W, B_H) {
    let vmapa = []

    for (let n = 0; B_H > n; n++){
        vmapa.push([]);
        for (let m = 0; B_W > m; m++){
            vmapa[n].push(0)
        }
    }

    return vmapa
}

function clearMap(){
    for (let y = 0; mapaArray.length > y; y++){
        for (let x = 0; mapaArray[y].length > x; x++){
            mapaArray[y][x] = 0
        }
    }
    return mapaArray
}  



function update() {
    draw()
    window.requestAnimationFrame(update)
}

function draw(){
    ctx.fillStyle = "000"
    ctx.fillRect(0,0, canvas.witdh, canvas.height)

    //Por cada Fila
    for (let y = 0; mapaArray.length > y; y++){
        
        //Por cada columna
        for (let x; mapaArray[y].length > x; x++){

            if (value == 0){
                ctx.fillStyle = "green"
                ctx.fillRect(x, y, 1, 1)

            } else if (value == 1){
                ctx.fillStyle = "red"
                ctx.fillRect(x, y, 1, 1)

            }
        }
    }
}

function snake(){
    mapaArray[posSnake[0], posSnake[1]] = 1

    document.addEventListener("keydown", function(keyboard){
        if(keyboard.key == "ArrowUp"){
            posSnake = moveSnake(posSnake, 0)
            mapaArray[posSnake[0], posSnake[1]] = 1
            console.log(mapaArray)
        }
    })
}

function moveSnake(posAct, direc){
    switch (direc){
        //Arriba
        case 0: 
            posAct[0] = posAct[0] -1 
        //Derecha
        case 1:
            posAct[1] = posAct[1] +1
        //abajo
        case 2:
            posAct[0] = posAct[0] +1
        //Izquierda
        case 3:
            posAct[1] = posAct[1] -1
    }
    return posAct
}


snake()

console.log(mapaArray)



update();