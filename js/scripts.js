

function Player(symbol){
  this.symbol = symbol
  this.spotsFilled = [];
}

Player.prototype.fillSpot = function(squareId){
  this.spotsFilled.push(parseInt(squareId))
}

function printBoard(){
  player1.spotsFilled.forEach(function(spot){
    $("#g-" + spot).text(player1.symbol)
  })

  player2.spotsFilled.forEach(function(spot){
    $("#g-" + spot).text(player2.symbol)
  })
}

var player1 = new Player("X");
var player2 = new Player("O");
var turn = player1;
var notTurn = player2;

function switchTurn(){
  var temp = turn;
  turn = notTurn;
  notTurn = temp;
}
function checkWin(player){
  console.log("here");
  console.log(player.spotsFilled);
  if(player.spotsFilled.includes(1) && player.spotsFilled.includes(2) && player.spotsFilled.includes(3)){
    return true
  } else if (player.spotsFilled.includes(1) && player.spotsFilled.includes(4) && player.spotsFilled.includes(7)) {
    return true
  } else if (player.spotsFilled.includes(1) && player.spotsFilled.includes(5) && player.spotsFilled.includes(9)) {
    return true
  } else if (player.spotsFilled.includes(2) && player.spotsFilled.includes(5) && player.spotsFilled.includes(8)) {
    return true
  } else if (player.spotsFilled.includes(3) && player.spotsFilled.includes(6) && player.spotsFilled.includes(9)) {
    return true
  } else if (player.spotsFilled.includes(3) && player.spotsFilled.includes(5) && player.spotsFilled.includes(7)) {
    return true
  } else if (player.spotsFilled.includes(4) && player.spotsFilled.includes(5) && player.spotsFilled.includes(6)) {
    return true
  } else if (player.spotsFilled.includes(7) && player.spotsFilled.includes(8) && player.spotsFilled.includes(9)) {
    return true
  } else{
    return false
  }
}
function checkSpot(arr1, arr2, id){
  arr1.forEach(function(spot){
    if(spot === id) return false
  })
  arr2.forEach(function(spot2){
    if(spot2 === id) return false
  })
  return true;
}
$(document).ready(function(){
  printBoard();

  $(".grid-item").click(function(){

    var clickedSquare = $(this)[0].id;
    if(checkSpot(player1.spotsFilled, player2.spotsFilled, clickedSquare)){
      turn.fillSpot(clickedSquare)
      printBoard();
      if(checkWin(turn)){
        $("#winDisplay").show()
        $("#winPlayer").text(turn.symbol)
        return
      }
      switchTurn();
    } else {
      console.log("spot filled");
    }

  })
})
