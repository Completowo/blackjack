
//Se crea un mapa de dimensiones 10x10
let mapa = crearMapa(25,25);


mapa[10][15] = 1;

document.getElementById("c-mapa").innerHTML = mostrarMapaString(mapa)










// Funciones

function mostrarMapaString(mapa){
    let texto = ""

    //Recorre las columnas
    for (let n = 0; mapa.length > n; n++){

        //Recorre las filas
        for (let m = 0; mapa[0].length > m; m++){
            texto = texto + "[" + mapa[n][m] + "] "
        }
        texto = texto + " <br> "
    }

    return texto

}
function dibujarMapa(mapa){
    const tablaContenedor = document.createElement("table")
    tablaContenedor.id("tablaContenedor")

    for (let n = 0; mapa[0].length > n; n++){

    }
}

// Función que crea un array bidimensional
// Para recorrer el Array los parametros deben seguir el siguente orden:
// [Fila, Columna]
function crearMapa(max_x, max_y) {
    let vmapa = []

    for (let n = 0; max_y > n; n++){
        vmapa.push([]);
        for (let m = 0; max_x > m; m++){
            vmapa[n].push(0)
        }
    }

    return vmapa
} 



