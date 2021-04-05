var seats = [false, true, false, true, true, true, false, true, false]
var selSeat

function findSeat(){
    // Se a poltrona já estiver marcada, reinicializa todas as poltronas para removê-las
    if (selSeat >= 0){
        selSeat = -1
        initSeats()
    }

    // Pesquisa por todas as disponibilidades de poltronas
    for (var i = 0; i < seats.length; i++){
        // Verifica se a poltrona atual está disponível
        if (seats[i]){
            // Define a marcação da poltrona e atualiza sua aparência
            selSeat = i
            document.getElementById('seat' + (i + 1)).src = 'img/seat_select.png'
            document.getElementById('seat' + (i + 1)).alt = 'Your seat'

            // Avisa o usuário para aceitar a poltrona
            var accept = confirm('Seat ' + (i + 1) + ' is available. Accept?')
            if (!accept){
                // O usuário rejeitou a poltrona, então desfaz a marcação e continua procurando
                selSeat = -1
                document.getElementById('seat' + (i + 1)).src = 'img/seat_available.png'
                document.getElementById('seat' + (i + 1)).alt = 'Available seat'
            } else {
                document.getElementById('seat' + (i + 1)).src = 'img/seat_select.png'
                document.getElementById('seat' + (i + 1)).alt = 'Selected seat'
                restSeat(i + 1)
                break
            }
        } else {
            document.getElementById('seat' + (i + 1)).src = 'img/seat_unavailable.png'
            document.getElementById('seat' + (i + 1)).alt = ' Unavailable seat'
        }
    }
}

function initSeats(){
    // Inicializa a aparência de todas as poltronas
    for (var i = 0; i < seats.length; i++){
        if (seats[i]){
            // Define a poltrona como disponível
            document.getElementById('seat' + (i + 1)).src = 'img/seat_available.png'
            document.getElementById('seat' + (i + 1)).alt = 'Poltrona disponível'
        } else {
            // Define a poltrona como indisponível
            document.getElementById('seat' + (i + 1)).src = 'img/seat_unavailable.png'
            document.getElementById('seat' + (i + 1)).alt = 'Poltrona indisponível'
        }
    }
}

function restSeat(n){
    // mostrará as cadeiras após a escolha da poltrona
    for (var i = n; n < seats.length; i++){
        if (seats[i]){
            // Define a poltrona como disponível
            document.getElementById('seat' + (i + 1)).src = 'img/seat_available.png'
            document.getElementById('seat' + (i + 1)).alt = 'Poltrona disponível'
        } else {
            // Define a poltrona como indisponível
            document.getElementById('seat' + (i + 1)).src = 'img/seat_unavailable.png'
            document.getElementById('seat' + (i + 1)).alt = 'Poltrona indisponível'
        }
    }
}