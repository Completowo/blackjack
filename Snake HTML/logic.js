
//Se crea el mapa
let mapa = crearMapa(25,25);

dibujarMapa(mapa)






colorearCelda(5,9,"rgb(78, 70, 255)")











// Funciones

/* 
Función para colorear celda 
- pY = valor fila
- pX = Valor columna
- pColor = Codigo de color
*/
function colorearCelda(pX,pY, pColor){
    document.getElementById("fila-"+pY+"-columna-"+pX).style.backgroundColor = pColor
}
    

function dibujarMapa(pMapa){
    const tablaContenedor = document.createElement("table")
    tablaContenedor.id = "tablaContenedor"

    for (let n = 0; pMapa.length > n; n++){
        // Fila padre
        const fila = document.createElement("tr")
        fila.id = "fila-" + n

        for (let m = 0; pMapa[n].length > m; m++){
            // Columnas
            const columna = document.createElement("td")
            columna.id = "fila-" + n + "-columna-" + m 
            columna.className = "celda"
            fila.appendChild(columna)
        }
        tablaContenedor.appendChild(fila)
    }
    document.getElementById("c-mapa").appendChild(tablaContenedor)
    return true
}


// toString del mapa
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



