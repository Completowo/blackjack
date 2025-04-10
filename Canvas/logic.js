
const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d")

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30


canvas.witdh = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT


ctx.scale(BLOCK_SIZE, BLOCK_SIZE)


let mapaArray = crearMapa(BOARD_WIDTH, BOARD_HEIGHT)
console.log(mapaArray)
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


function update() {
    draw()
    window.requestAnimationFrame(update)
}

function draw(){
    ctx.fillStyle = "000"
    ctx.fillRect(0,0, canvas.witdh, canvas.height)

    mapaArray.forEach((row, y) => {
        row.forEach((value, x) =>{
            if (value == 0){
                ctx.fillStyle = "green"
                ctx.fillRect(x, y, 1, 1)
            }
        })
    })
    

}


update();