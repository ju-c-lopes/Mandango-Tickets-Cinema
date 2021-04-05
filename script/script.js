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
            } else {
                // poltrona não disponível
                setSeat(i, j + 1, 'unavailable')
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
        for (var j = 0; j < seats[i].length; j++){
            if (seats[i][j]){
                // Define a poltrona como disponível
                setSeat(i, j + 1, 'available')
            } else {
                // Define a poltrona como indisponível
                setSeat(i, j + 1, 'unavailable')
            }
        }
    }
}

// mostrará as cadeiras após a escolha da poltrona na fileira atual
function restSeat(m, n){
    for (var i = n; i < seats[m].length; i++){        
        if (seats[m][i]){
            // Define a poltrona como disponível
            setSeat(m, i + 1, 'available')
        } else {
            // Define a poltrona como indisponível
            setSeat(m, i + 1, 'unavailable')
        }
    }
}

// Função para mostrar o restante de todas as fileiras após o usuário aceitar uma das possíveis opções
function restRows(m){
    for (var i = m; i < seats.length; i++){
        for (var j = 0; j < seats[i].length; j++){
            if (seats[i][j]){
                // Define a poltrona como disponível
                setSeat(i, j + 1, 'available')
            } else {
                // Define a poltrona como indisponível
                setSeat(i, j + 1, 'unavailable')
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
                setSeat(i, j + x + 1, 'select')
            }
            ok = true
        } else {
            // O usuário rejeitou a poltrona, então desfaz a marcação e continua procurando
            selSeat = -1
            setSeat(i, j + 1, 'available')
            ok = false
        }
    } else {
        selSeat = -1
        setSeat(i, j + 1, 'available')
    }
    return ok
}

// Função para linkar a imagem da cadeira em seu devido lugar e disponibilidade no html
function setSeat(fileira, assento, status) {
    document.getElementById(`seat${fileira}${assento}`).src = `img/seat_${status}.png`
    status = status.charAt(0).toUpperCase() + status.slice(1)
    document.getElementById(`seat${fileira}${assento}`).alt = `${status} seat`
}