

function Player(symbol){
  this.symbol = symbol
  this.spotsFilled = [];
}

Player.prototype.fillSpot = function(squareId){
  this.spotsFilled.push(squareId)
}

function emptyBoard(){
  for(let i = 1; i <= 9; ++i){
    $("#g-" + i).text("")
  }
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
  var found = false;
  arr1.forEach(function(spot){
    console.log(spot);
    console.log(id);
    if(spot === id) {
      console.log("equal");
      found = true
    }
  })
  arr2.forEach(function(spot2){
    if(spot2 === id) {
      found = true
    }
  })
  return found;
}

$(document).ready(function(){
  printBoard();

  $(".grid-item").click(function(){

    var clickedSquare = parseInt($(this)[0].id);
    if(!checkSpot(player1.spotsFilled, player2.spotsFilled, clickedSquare)){
      console.log("here");
      turn.fillSpot(clickedSquare)
      printBoard();
      if(checkWin(turn)){
        $("#winDisplay").show()
        $("#winPlayer").text(turn.symbol+"'s have ")
        return
      }
      if(player1.spotsFilled.length === 5 || player2.spotsFilled.length === 5){
        $("#winDisplay").show()
        $("#winPlayer").text("Nobody has ")
        return
      }
      switchTurn();
    } else {
      console.log("spot filled");
    }

    $(".refresh").click(function(event) {
      $("#winDisplay").hide();
      player1.spotsFilled = [];
      console.log(player1.spotsFilled);
      player2.spotsFilled = [];
      emptyBoard();
    })

  })
})
