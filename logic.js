/* Declaración de variables */

let cartas = [];
let mazo = [];
let mazoDealer = [];
let flag = true;

generarCartas(cartas)

/*Logica*/


/* Empezar con 2 cartas */
darCartas(2, mazo, cartas)
darCartas(2, mazoDealer, cartas)


/* dibujar las cartas */
for (let n = 0; n < mazo.length; n++) {
    crearCarta(mazo[n])
}

for (let n = 0; n < mazoDealer.length; n++) {
    if (n == 0){
        crearCartaDealer(mazoDealer[n], true)
    } else {
        crearCartaDealer(mazoDealer[n], false)
    }
    
}

FinalizarPartida()








/* Funciones */

function voltearCartasDealer(){
    for (let n = 0; n < mazoDealer.length; n++){
        let img = document.getElementById(mostrarCarta(mazoDealer[n])+"-D").style.backgroundImage

        if (img == 'url("Cartas/back.jpg")'){
            let query = 'url(Cartas/' + mostrarCarta(mazoDealer[n]) + '.png)'
            document.getElementById(mostrarCarta(mazoDealer[n])+"-D").style.backgroundImage = query
        }

        
    }

}

function FinalizarPartida(){
    desactivarActivarBtn(0)
    desactivarActivarBtn(1)

    AgregarCartaDealer();
    voltearCartasDealer();

    h3MostrarValor(sumarCartas(mazoDealer, true),false);
    
    switch (identificarGanador(mazo, mazoDealer)){
        
        case 2:
            document.getElementById("mensajeFinal").innerHTML = "EMPATE"
             break
        case 1:
            document.getElementById("mensajeFinal").innerHTML = "GANASTE"
             break
        case 0:
            document.getElementById("mensajeFinal").innerHTML = "PERDISTE"
             break
    }
}

function AgregarCarta(){
    darCartas(1,mazo,cartas)
    crearCarta(mazo[mazo.length-1])
}

function AgregarCartaDealer(){
    while (sumarCartas(mazoDealer, true) < 17){
        darCartas(1, mazoDealer,cartas)
        crearCartaDealer(mazo[mazo.length-1])
    }
}

function generarCartas(cartas){
    for (let n = 0; n < 4; n++) {
        for (let m = 0; m < 13; m++) {
            cartas.push([n,m])
        }

    }
}

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

function buscarCarta(carta, mazo){
    for (let n = 0; n != mazo.lenght; n++)
        if (carta == mazo[n]){
            return true;
        } else {
            return false;
        }

}

function mostrarMazo(mazo) {
    for (let n = 0; n < mazo.length; n++) {
        console.log(mostrarCarta(mazo[n]))
    }
}

function limpiarMazo(mazo) {
    mazo.length = 0;
}

function crearCarta(carta){
    /* Crear contenedor padre */
    const divSuperior = document.createElement("div");
    divSuperior.id = mostrarCarta(carta)+"-J";
    divSuperior.className = "carta";

    /* Insertar carta creada */
    document.getElementById("misCartas").insertAdjacentElement("afterbegin", divSuperior);
    
    /* Buscar y colocar textura a la carta */
    let query = 'url(Cartas/' + mostrarCarta(carta) + '.png)'
    document.getElementById(mostrarCarta(carta)+"-J").style.backgroundImage = query

     /* actualizar valor del contador h3Valor */
     h3MostrarValor(sumarCartas(mazo, true),true)
}

function crearCartaDealer(carta, flag){
    /* Crear contenedor padre */
    const divSuperior = document.createElement("div");
    divSuperior.id = mostrarCarta(carta)+"-D";
    divSuperior.className = "cartaDealer";

    /* Insertar carta creada */
    document.getElementById("cartasDealer").insertAdjacentElement("afterbegin", divSuperior);
    
    /* Buscar y colocar textura a la carta */

    let query = ""
    if (flag){
        query = 'url(Cartas/back.jpg)'
    } else {
        query = 'url(Cartas/' + mostrarCarta(carta) + '.png)'
    }
    document.getElementById(mostrarCarta(carta)+"-D").style.backgroundImage = query
    
    /* actualizar valor del contador h3Valor */
    h3MostrarValor(sumarCartas(mazoDealer, false),false)
}

function sumarCartas(mazo, flag) {
    let valorCartas = {
        0: 11, /*AS*/
        1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10,
        10: 10, /*J*/
        11: 10, /*Q*/
        12: 10 /*K*/
    }

    let suma = 0;
    if (flag){
        for (let n = 0; n < mazo.length; n++){
        let carta = mazo[n]
        suma = suma + valorCartas[carta[1]]
        }
    }else{
        for (let n = 0; n < mazo.length; n++){
            if (!(n == 0)){
                let carta = mazo[n]
                suma = suma + valorCartas[carta[1]]
                }
            }
            
    }
    

    if(suma >= 21){
        console.log("gil")
    }

    return suma
}

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
    
    /* En caso de que el botón ya esté activado: */
    if (document.getElementById(idBoton).disabled == false){
        flag = true;
        color = "linear-gradient(135deg, #00449c, #002e69)";
        opacidad = "50%"
    }

    document.getElementById(idBoton).disabled = flag;
    document.getElementById(idBoton).style.backgroundImage = color;
    document.getElementById(idBoton).style.opacity = opacidad;
}

function identificarGanador(mazoJ, mazoD){
    if (sumarCartas(mazoJ,true) <= 21 && sumarCartas(mazoD, true) < 21){
        if (sumarCartas(mazoJ,true) == sumarCartas(mazoD,true)){
            /* Empate */
            return 2
        }
        else if (sumarCartas(mazoJ, true) > sumarCartas(mazoD,true)){
            /* Ganaste */
            return 1
        }
        else{
            /* Perdiste */
            return 0
        }
    } else if (sumarCartas(mazoJ, true) <= 21 && sumarCartas(mazoD, true) > 21){
        /* Ganaste */
        return 1
    } else {
        /* Perdiste */
        return 0
    }
}

function h3MostrarValor(valor, flag){

    if (flag){
        document.getElementById("h3Valor").innerHTML = valor
    }else{
        document.getElementById("h3ValorDealer").innerHTML = valor
    }
    
}


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