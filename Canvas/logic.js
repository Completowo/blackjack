
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






update();
snake()





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
            if ((mapaArray[y][x] != 2)){
                mapaArray[y][x] = 0
            }
        }
    }
    return mapaArray
}  



function update() {

    //setTimeout(update,200)
    draw()
    window.requestAnimationFrame(update)
}

function draw(){
    ctx.fillStyle = "000"
    ctx.fillRect(0,0, canvas.width, canvas.height)

    mapaArray.forEach((row, y) => {
        row.forEach((value, x) =>{
            if (value == 0){
                ctx.fillStyle = "green"
                ctx.fillRect(x, y, 1, 1)
            }else if (value == 1){
                ctx.fillStyle = "purple"
                ctx.fillRect(x, y, 1, 1)
            }else if (value == 2){
                ctx.fillStyle = "red"
                ctx.fillRect(x, y,1,1)
            }
        })
    })

    food()
}

function snake(){
    document.addEventListener("keydown", function(keyboard){
        const [headY, headX] = posSnake[0]
        let newHead

        //Mover hacia arriba
        if(keyboard.key == "ArrowUp" || keyboard.key == "w"){
            if (canMove(posSnake ,headY-1, headX, BOARD_HEIGHT-1, BOARD_WIDTH)){
                newHead = [headY-1, headX]
            } else {
                newHead = [headY, headX]
            }

        //Mover hacia abajo
        }else if (keyboard.key == "ArrowDown" ||keyboard.key == "s"){
            if (canMove(headY+1, headX, BOARD_HEIGHT-1, BOARD_WIDTH)){
                newHead = [headY+1, headX]
            } else {
                newHead = [headY, headX]
            }

        //Mover izquierda
        }else if (keyboard.key == "ArrowLeft" || keyboard.key == "a"){
            if (canMove(headY, headX-1, BOARD_HEIGHT, BOARD_WIDTH-1)){
                newHead = [headY, headX - 1]
            } else {
                newHead = [headY, headX]
            }

        //Mover Derecha
        }else if (keyboard.key == "ArrowRight" || keyboard.key == "d"){
            if (canMove(headY, headX+1, BOARD_HEIGHT, BOARD_WIDTH-1)){
                newHead = [headY, headX +1]
            } else {
                newHead = [headY, headX]
            }

        }

        console.log(newHead)
        console.log(posSnake)
        console.log(headY)
        console.log(headX)

        //Comer manzana
        if (mapaArray[newHead[0]][newHead[1]] == 2){
            posSnake.unshift(newHead);
            
        }else {
            posSnake.unshift(newHead);
            posSnake.pop()
        }
        
        clearMap()

        posSnake.forEach(([y, x]) => {
            mapaArray[y][x] = 1;
        });

    })

}

function canMove(p_snake,p_posy, p_posx, p_height, p_width){
    if (p_posy <= p_height && p_posy <= p_height){
        if (p_posx <= 0 && p_posx <= p_width){
            if (p_snake.includes([p_posy,p_posx])){
                return false
        }
    }

    return true
    }
}

function food(){
     if (!(existFood(mapaArray))) {

        let flag = true

        let p_x = Math.floor(Math.random() * BOARD_HEIGHT)
        let p_y = Math.floor(Math.random() * BOARD_WIDTH)

        while (flag){
            if (mapaArray[p_x][p_y] == 1) {
                p_x = Math.floor(Math.random() * BOARD_HEIGHT)
                p_y = Math.floor(Math.random() * BOARD_WIDTH)
            } else {
                flag = false
                mapaArray[p_x][p_y] = 2
            };
        }
        
     }

}

function existFood(p_mapa){
    for (let n = 0; p_mapa.length > n; n++){
        for (let m = 0; p_mapa[n].length > m; m++){
            if (p_mapa[n][m] == 2){
                return true
            }
        }
    }

}


