var seats = [[],[],[],[],[],[]]
var selSeat

// cria array de arrays aleatórios booleanos para cadeiras e fileiras
function createRows(){
    for (var i = 0; i < 6; i++){
        for (var j = 0; j < 9; j++){
            var boole = Math.random() >= 0.5
            seats[i][j] = boole
        }
    }
}

// Se a poltrona já estiver marcada, reinicializa todas as poltronas para removê-las
function findSeat(){
    createRows()
    if (selSeat >= 0){
        selSeat = -1
        initSeats()
    }

    // Pesquisa por todas as disponibilidades de poltronas
    for (var i = 0; i < seats.length; i++){
        var ok = false
        for (var j = 0; j < seats[i].length; j++){
            // Verifica se a poltrona atual está disponível
            if (seats[i][j]){
                if (threeChairs(i, j)){
                    var ok = true // variável para confirmar ao primeiro loop for que a busca foi finalizada
                    restSeat(i, (j + 3)) // função para mostrar o restante da fileira
                    break // para(stop) a procura por poltrona na fileira atual
                }
                
            } 
            if(!seats[i][j]) {
                document.getElementById(`seat${i}${j + 1}`).src = 'img/seat_unavailable.png'
                document.getElementById(`seat${i}${j + 1}`).alt = ' Unavailable seat'
            }
        }
        if (ok){
            restRows(i + 1) // função para mostrar o restante de todas as poltronas
            break
        }
    }
}

// Inicializa a aparência de todas as poltronas
function initSeats(){
    for (var i = 0; i < seats.length; i++){
        for (var j = 0; j < seats[i].length; i++){
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
}

// mostrará as cadeiras após a escolha da poltrona na fileira atual
function restSeat(m, n){
    for (var i = n; i < seats[m].length; i++){        
        if (seats[m][i]){
            // Define a poltrona como disponível
            document.getElementById(`seat${m}${i + 1}`).src = 'img/seat_available.png'
            document.getElementById(`seat${m}${i + 1}`).alt = 'Poltrona disponível'
        } else {
            // Define a poltrona como indisponível
            document.getElementById(`seat${m}${i + 1}`).src = 'img/seat_unavailable.png'
            document.getElementById(`seat${m}${i + 1}`).alt = 'Poltrona indisponível'
        }
    }
}

// Função para mostrar o restante de todas as fileiras após o usuário aceitar uma das possíveis opções
function restRows(m){
    for (var i = m; i < seats.length; i++){
        for (var j = 0; j < seats[i].length; j++){
            if (seats[i][j]){
                // Define a poltrona como disponível
                document.getElementById(`seat${i}${j + 1}`).src = 'img/seat_available.png'
                document.getElementById(`seat${i}${j + 1}`).alt = 'Poltrona disponível'
            } else {
                // Define a poltrona como indisponível
                document.getElementById(`seat${i}${j + 1}`).src = 'img/seat_unavailable.png'
                document.getElementById(`seat${i}${j + 1}`).alt = 'Poltrona indisponível'
            }
        }
    }
}

// Função que verifica 3 cadeiras disponiveis em sequencia e pergunta se o usuário aceita essa opção
function threeChairs(i, j){
    var ok = false
    if (seats[i][j] && seats [i][j + 1] && seats [i][j + 2]){
        var accept = confirm('Seat ' + (j + 1) + ' through ' + (j + 3) + ' in row ' + i + ' is available. Accept?')
        if (accept){
            for (var x = 0; x <= 2; x++){
                selSeat = j + x
                document.getElementById(`seat${i}${j + x + 1}`).src = 'img/seat_select.png'
                document.getElementById(`seat${i}${j + x + 1}`).alt = 'Selected seat'
            }
            ok = true
        } else {
            // O usuário rejeitou a poltrona, então desfaz a marcação e continua procurando
            selSeat = -1
            document.getElementById(`seat${i}${j + 1}`).src = 'img/seat_available.png'
            document.getElementById(`seat${i}${j + 1}`).alt = 'Available seat'
            ok = false
        }
    } else {
        selSeat = -1
        document.getElementById(`seat${i}${j + 1}`).src = 'img/seat_available.png'
        document.getElementById(`seat${i}${j + 1}`).alt = 'Available seat'
    }
    return ok
}