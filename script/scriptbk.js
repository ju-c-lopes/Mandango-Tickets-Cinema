var seats = []
var chairs = []

function initSeats(){
    for (var x = 0; x < 9; x++){
        var boole = Math.random() >= 0.5
        seats[x] = boole
        if (seats[x]){
            chairs[x] = document.createElement('img')
            chairs[x].setAttribute('src', 'img/seat_available.png')
            chairs[x].setAttribute('style', 'width: 40px')

        }
    }
}