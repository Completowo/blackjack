
const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d")

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30
let posSnake = [[3,3]]


canvas.width = BLOCK_SIZE * BOARD_WIDTH
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
    ctx.fillRect(0,0, canvas.width, canvas.height)

   /* //Por cada Fila
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
    }*/

    mapaArray.forEach((row, y) => {
        row.forEach((value, x) =>{
            if (value == 0){
                ctx.fillStyle = "green"
                ctx.fillRect(x, y, 1, 1)
            }else if (value == 1){
                ctx.fillStyle = "red"
                ctx.fillRect(x, y, 1, 1)
            }
        })
    })
}

function snake(){
    document.addEventListener("keydown", function(keyboard){
        const [headY, headX] = posSnake[0]
        let newHead
        //Mover hacia arriba
        if(keyboard.key == "ArrowUp"){
            newHead = [headY - 1, headX];
            console.log(mapaArray)


        //Mover hacia abajo
        }else if (keyboard.key == "ArrowDown"){
            newHead = [headY + 1, headX]


        //Mover izquierda
        }else if (keyboard.key == "ArrowLeft"){
            newHead = [headY, headX - 1]
            
        

        //Mover Derecha
        }else if (keyboard.key == "ArrowRight"){
            newHead = [headY, headX + 1]
        }


        posSnake.unshift(newHead);
        posSnake.pop()

        clearMap()


        posSnake.forEach(([y, x]) => {
            mapaArray[y][x] = 1;
        });
    })



}


/*function moveSnake(posAct, direc){
    switch (direc){
        //Arriba
        case 0: 
            posAct[0] = posAct[0] -1
            break
        //Derecha
        case 1:
            posAct[1] = posAct[1] +1
            break
        //abajo
        case 2:
            posAct[0] = posAct[0] +1
            break
        //Izquierda
        case 3:
            posAct[1] = posAct[1] -1
            break
    }
    return posAct
} */


snake()
console.log(mapaArray)



update();