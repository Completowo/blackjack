// Declaración de variables

let cartas = [];
let mazo = [];
let mazoDealer = [];
let flag = true;

let lol = false;

// Toda la Lógica va aquí 

// Primero se genera la baraja completa de las cartas
generarCartas(cartas)

// Se le dan 2 cartas al Jugador y al Dealer 
darCartas(2, mazo, cartas)
darCartas(2, mazoDealer, cartas)


// Dibujar en la pantalla las cartas del jugador
for (let n = 0; n < mazo.length; n++) {
    crearCarta(mazo[n])
}

//Dibujar en la pantalla las cartas del Dealer
for (let n = 0; n < mazoDealer.length; n++) {
    if (n == 0){
        crearCartaDealer(mazoDealer[n], true)
    } else {
        crearCartaDealer(mazoDealer[n], false)
    }
}
















//      ***Funciones*** 


// Dar vuelta las cartas que están boca abajo del Dealer.
function voltearCartas(mazoD){
    document.getElementById(mostrarCarta(mazoD[0])+"-D").style.backgroundImage = 'url(Cartas/' + mostrarCarta(mazoD[0]) + '.png)'
    /* 
    for (let n = 0; n < mazoD.length-1; n++){
        
        console.log(mostrarCarta(mazoD[n])+"-D")
        let img = document.getElementById(mostrarCarta(mazoD[n])+"-D").style.backgroundImage

        if (img == 'url("Cartas/back.jpg")'){
            let query = 'url(Cartas/' + mostrarCarta(mazoD[n]) + '.png)'
            document.getElementById(mostrarCarta(mazoD[n])+"-D").style.backgroundImage = query
        }   
    }
    */
}

// Terminar el juego y mostrar el resultado
function FinalizarPartida(){
    desactivarActivarBtn(0);
    desactivarActivarBtn(1);

    AgregarCartaDealer();
    voltearCartas(mazoDealer);

    h3MostrarValor(sumarCartas(mazoDealer, true),false);
    
    let resultados = identificarGanador(mazo, mazoDealer)
    switch (resultados[0]){
        
        case 2:
            document.getElementById("mensajeFinal").innerHTML = "EMPATE";
             break
        case 1:
            document.getElementById("mensajeFinal").innerHTML = "GANASTE";
             break
        case 0:
            document.getElementById("mensajeFinal").innerHTML = "PERDISTE";
             break
    }

    document.getElementById("subMensajeFinal").innerHTML = resultados[1];

}


//      ***Funciones de cartas***

//Genera todas las cartas de la baraja.
function generarCartas(cartas){
    for (let n = 0; n < 4; n++) {
        for (let m = 0; m < 13; m++) {
            cartas.push([n,m])
        }
    }
}

// Revisa si la carta existe dentro del mazo
function buscarCarta(carta, mazo){
    for (let n = 0; n != mazo.lenght; n++)
        if (carta == mazo[n]){
            return true;
        } else {
            return false;
        }
}

// Le agrega 1 carta al mazo del Jugador
function AgregarCarta(){
    darCartas(1,mazo,cartas)
    crearCarta(mazo[mazo.length-1])
}


// Agregar cartas al Dealer hasta que el valor total de su mazo sea mayor a 16
function AgregarCartaDealer(){
    while (sumarCartas(mazoDealer, true) < 17){
        darCartas(1, mazoDealer,cartas)
        crearCartaDealer(mazoDealer[mazoDealer.length-1])
    }
}

// Dar X cantidad de cartas a un mazo
function darCartas(nCartas, mazo, cartas){
    let count=0;
    while (nCartas != count){
        carta = cartas[Math.floor(Math.random() * 51)];
        if (!(buscarCarta(carta,mazo))) {
            mazo.push(carta)
            count++
        }
    }
}

// Imprimir cartas en la consola
function mostrarMazo(mazo) {
    console.log("------------------\nMazo: ")
    for (let n = 0; n < mazo.length; n++) {
        console.log(mostrarCarta(mazo[n]))
    }
    console.log("------------------")
}

// Quita TODAS las cartas de un mazo
function limpiarMazo(mazo) {
    mazo.length = 0;
}

// Dibuja 1 carta en la baraja del Jugador
function crearCarta(carta){
    // Crear contenedor padre
    const divSuperior = document.createElement("div");
    divSuperior.id = mostrarCarta(carta)+"-J";
    divSuperior.className = "carta";

    // Insertar carta creada
    document.getElementById("misCartas").insertAdjacentElement("afterbegin", divSuperior);
    
    // Buscar y colocar textura a la carta
    let query = 'url(Cartas/' + mostrarCarta(carta) + '.png)'
    document.getElementById(mostrarCarta(carta)+"-J").style.backgroundImage = query


    let valorTotal = sumarCartas(mazo, true)

     // actualizar valor del contador h3Valor
     h3MostrarValor(valorTotal,true)

     if (valorTotal > 21) {
        FinalizarPartida()
     }
}

/* Dibuja 1 carta en la baraja del Dealer.
flag = True --> La carta se dibuja boca abajo.
flag = false --> La carta se dibuja boca arriba. 
*/
function crearCartaDealer(carta, flag){
    // Crear contenedor padre
    const divSuperior = document.createElement("div");
    divSuperior.id = mostrarCarta(carta)+"-D";
    divSuperior.className = "cartaDealer";

    // Insertar carta creada
    document.getElementById("cartasDealer").insertAdjacentElement("afterbegin", divSuperior);
    
    // Buscar y colocar textura a la carta

    let query = ""
    if (flag){
        query = 'url(Cartas/back.jpg)'
    } else {
        query = 'url(Cartas/' + mostrarCarta(carta) + '.png)'
    }
    document.getElementById(mostrarCarta(carta)+"-D").style.backgroundImage = query
    
    // Mostrar valor actualizado del mazo del Dealer
    h3MostrarValor(sumarCartas(mazoDealer, false),false)
}


/* Sumar las cartas y retornar el valor total del mazo.
flag = true --> Retorna la suma de TODAS las cartas
flag = false --> Omite la primera de las cartas
*/
function sumarCartas(pMazo, flag) {
    let valorCartas = {
        0: 11, //AS
        1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10,
        10: 10, //J
        11: 10, //Q
        12: 10 //K
    }

    let suma = 0;
    if (flag) {
        for (let n = 0; n < pMazo.length; n++){
        let carta = pMazo[n];
        
        suma = suma + valorCartas[carta[1]];
        }

    } else {
        for (let n = 0; n < pMazo.length; n++){
            if (!(n == 0)){
                let carta = pMazo[n];
                suma = suma + valorCartas[carta[1]];
                }
            }

    }

    return suma
}

// Desactivar o activar botones
// Si está apagado lo enciende, y viceversa
function desactivarActivarBtn(numBtn){
    let flag = false
    let idBoton
    let color = "linear-gradient(135deg, #006eff, #004db3);"
    let opacidad = "100%"

    switch (numBtn) {
        case 0:
            idBoton = "btnAgregarCarta";
            break
        case 1: 
            idBoton = "btnQuedarse";
            break
        case 2: 
            idBoton = "btnReiniciar";
            break
    }
    
    // En caso de que el botón ya esté activado:
    if (document.getElementById(idBoton).disabled == false){
        flag = true;
        color = "linear-gradient(135deg, #00449c, #002e69)";
        opacidad = "50%"
    }

    document.getElementById(idBoton).disabled = flag;
    document.getElementById(idBoton).style.backgroundImage = color;
    document.getElementById(idBoton).style.opacity = opacidad;
}


// Comparar los puntajes y retornar ganador
function identificarGanador(mazoJ, mazoD){
    let totalJ = sumarCartas(mazoJ,true);
    lol = true
    let totalD = sumarCartas(mazoD, true);

    let resultado = 0;
    let sub = "";

    if (totalJ < 22 && totalD < 22){
        if (totalJ == totalD){
            /* Empate */
            resultado = 2
            sub = ""
        }
        else if (totalJ > totalD){
            /* Ganaste por puntaje */
            resultado = 1
            sub = "Le ganaste en puntaje al Dealer"
        }
        else{
            /* Perdiste por puntaje*/
            resultado = 0
            sub = "Perdiste por puntaje contra Dealer"
        }
    } else if (totalJ <= 21 && totalD > 21){
        /* Ganaste, el Dealer se excedió */
        resultado = 1
        sub = "El dealer se excedió"
    } else {
        /* Perdiste malo wajaja*/
        resultado = 0

        switch (Math.floor(Math.random() * 25)){
            case 0: sub = "MALO QLO WAJAJAJAJAJA"; break
            case 1: sub = "Por codicioso (WAJAJA)"; break
            case 2: sub = "WAJAJAJAJA"; break
            case 3: sub = "Por codicioso"; break
            case 4: sub = "Buuuu"; break
            default: sub = "Te excediste"; break
        }
        
    }

    return [resultado, sub]
}

/*  Mostrar valor del mazo en pantalla
flag = true --> Jugador
flag = false --> Dealer
*/
function h3MostrarValor(valor, flag){

    if (flag){
        document.getElementById("h3Valor").innerHTML = valor
    }else{
        document.getElementById("h3ValorDealer").innerHTML = valor
    }
    
}

// funcion tostring para mostrar las cartas
function mostrarCarta(carta){
    let tipo = ""
    let numero = ""
    switch (carta[0]){
        case 0: 
            tipo = "Corazon";
            break
        case 1: 
            tipo = "Rombo";
            break
        case 2: 
            tipo = "Trebol";
            break
        case 3: 
            tipo = "Pica";
            break
    }

    switch (carta[1]){
        case 0: 
            numero = "A";
            break
        case 1: 
            numero = "2";
            break
        case 2: 
            numero = "3";
            break
        case 3: 
            numero = "4";
            break
        case 4: 
            numero = "5";
            break
        case 5: 
            numero = "6";
            break
        case 6: 
            numero = "7";
            break
        case 7: 
            numero = "8";
            break
        case 8: 
            numero = "9";
            break
        case 9: 
            numero = "10";
            break
        case 10:   
            numero = "J";
            break
        case 11: 
            numero = "Q";
            break
        case 12: 
            numero = "K";
            break
    }

    return (tipo + "-" + numero)
}