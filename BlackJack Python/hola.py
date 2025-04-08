import funciones as fn


cartas = []
mazo = []
mazoDealer = []
flag = True


while flag:
    fn.generarCartas(cartas)
    fn.darCartas(2 ,mazo, cartas)
    print("----------Bienvenido a blackjack----------")
    print("----------Tu mazo----------")
    fn.mostrarMazo(mazo)
    print("Tu puntaje: ",fn.sumarCartas(mazo))

    print("-------------------------------------------")
    while True:
        otracarta = input("¿Deseas otra carta? S/n: ").strip().lower()
        if otracarta == 's':
            fn.darCartas(1 ,mazo, cartas)
            fn.mostrarMazo(mazo)
            puntaje = fn.sumarCartas(mazo)
            print("Tu puntaje: ",fn.sumarCartas(mazo))
        elif otracarta == 'n':
            fn.mostrarMazo(mazo)
            puntaje = fn.sumarCartas(mazo)
            print("Tu puntaje: ",fn.sumarCartas(mazo))
            print("--------------------------------------------------")
            print("--------------Mazo Dealer----------------")
            fn.poblarMazoDealer(cartas,mazoDealer)
            fn.mostrarMazo(mazoDealer)
            print(fn.sumarCartas(mazoDealer))

            match fn.finalizarPartida(mazo, mazoDealer): 
                case 0: print("Perdiste contra el dealer :(")
                case 1: print("Ganaste contra el dealer :)")
                case 2: print("Empate .____.")
            break
    
    flag2 = True
    while flag2:
        match input("-------------------------------------\nQuieres volver a jugar X_X?"):
            case 's': 
                fn.limpiarMazos(mazo, mazoDealer)
                flag2 = False
            case 'n': 
                flag = False
                flag2 = False

            case _: print("Por favor andate a la xuxa\n-------------------------------------")


    



    