import random


def mostrarCarta(carta):
    match carta[0]:
        case 0:
            tipo = "Corazón"
        case 1: 
            tipo = "Rombo"
        case 2: 
            tipo = "Trébol"
        case 3:
            tipo = "Pica"
    match carta[1]:
        case 0: numero = "A"
        case 1: numero = "2"
        case 2: numero = "3"
        case 3: numero = "4"
        case 4: numero = "5"
        case 5: numero = "6"
        case 6: numero = "7"
        case 7: numero = "8"
        case 8: numero = "9"
        case 9: numero = "10"
        case 10: numero = "J"
        case 11: numero = "Q"
        case 12: numero = "K"
    texto = tipo + ": " + numero
    return texto

def sumarCartas(mazo):
    valorCartas = {
        0: 11, #AS
        1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10,
        10: 10, #J
        11: 10, #Q
        12: 10 #K
    }

    suma = 0
    for carta in mazo:
        suma += valorCartas[carta[1]]
    return suma

def generarCartas(cartas):
    for n in range(4):
        for y in range(13):
            cartas.append([n,y])

def darCartas(numeroCartas, mazo, cartas):
    count = 0
    while numeroCartas != count:
        carta = cartas[random.randint(0,51)]
        if not buscarCartas(carta, mazo):
            mazo.append(carta)
            count = count + 1


def buscarCartas(carta, mazo):
    for n in mazo:
        if n == carta:
            return True
    
    return False

def mostrarMazo(mazo):
    for n in mazo:
        print(mostrarCarta(n))

def poblarMazoDealer(cartas, mazoDealer):
    if len(mazoDealer) == 0:
        darCartas(1, mazoDealer, cartas) 
    while sumarCartas(mazoDealer) < 16:
        darCartas(1, mazoDealer, cartas)


def finalizarPartida(mazo, mazoDealer):
    if sumarCartas(mazo) <= 21 and sumarCartas(mazoDealer) <= 21:
        if sumarCartas(mazo) == sumarCartas(mazoDealer):
            return 2
        elif sumarCartas(mazo) > sumarCartas(mazoDealer):
            return 1
        else:
            return 0
    elif sumarCartas(mazo) <= 21 and sumarCartas(mazoDealer) > 21:
        return 1
    else:
        return 0

def limpiarMazos(mazo, mazoDealer):
    mazo.clear()
    mazoDealer.clear()