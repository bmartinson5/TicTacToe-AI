function Player(symbol){
  this.symbol = symbol
  this.spotsFilled = [];
}
function  Computer(symbol){
  this.symbol = symbol
  this.spotsFilled = [];
}
Player.prototype.fillSpot = function(squareId){
  this.spotsFilled.push(squareId)
}
Computer.prototype.fillSpot = function(squareId){
   this.spotsFilled.push(squareId)
}
Computer.prototype.checkForWin = function(arr1, arr2){
  var spotsFilled = this.spotsFilled
  var result = null;
  spotsNext.forEach(function(spot){
    var twoNext = spot[0]
    var winningSpot = spot[1]
    if(arr1.includes(twoNext[0]) && arr1.includes(twoNext[1])){
      if(!arr2.includes(winningSpot)){
        console.log("here");
        result = winningSpot
      }
    }
  })
  return result;
}
Computer.prototype.fillNonCorner = function(){
  return nonCorners[Math.floor(Math.random() * Math.floor(4))]
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
var player2 = new Computer("O");
var turn = player1;
var notTurn = player2;
var spotsNext = [ [[5,7], 3] , [[1,2],3], [[4,5],6], [[7,8],9], [[3,6],9], [[1,4],7], [[2,5],8], [[3, 5], 7], [[2,3],1],[[5,6],4],[[8,9],7],[[6,9],3],[[4,7],1],[[5,8],2],[[1,7],4],[[1,3],2],[[1,9],5],[[3,9],6],[[3,7],5],[[4,6],5],[[7,9],8],[[2,8],5], [[1,5],9]];
var nonCorners = [2,4,6,8];

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


function checkSpot(id){
  var found = false;
  player1.spotsFilled.forEach(function(spot){
    if(spot === id) {
          found = true
    }
  })
  player2.spotsFilled.forEach(function(spot2){
    if(spot2 === id) {
      found = true
    }
  })

  return found;
}

//computer move
function autoFill(){
  var squareChoice;
  var arr1 = player1.spotsFilled
  var arr2 = player2.spotsFilled
  //return player2.checkForWin(arr2, arr1) || player2.checkForWin(arr1, arr2)

  squareChoice = player2.checkForWin(arr2, arr1)
  if(squareChoice) return squareChoice
  squareChoice = player2.checkForWin(arr1, arr2)
  if(squareChoice) return squareChoice
    // if(!squareChoice){
    // squareChoice = player2.checkForWin(player1.spotsFilled, player2.spotsFilled)
    if(!squareChoice){
      var count = 0
      do{
        console.log("1");
        squareChoice = (Math.floor(Math.random() * Math.floor(9)))+1
      } while(checkSpot(squareChoice));
    }
  return squareChoice
}

function check(){

  if(checkWin(turn)){
    $("#winDisplay").show()
    $("#winPlayer").text(turn.symbol+"'s have ")
    return true
  }
  if(player1.spotsFilled.length === 5 || player2.spotsFilled.length === 5){
    $("#winDisplay").show()
    $("#winPlayer").text("Nobody has ")

    return true
  }
    console.log("here");
    switchTurn();
  return false

}

$(document).ready(function(){
  printBoard();
  var gameOver = false

  $(".grid-item").click(function(){
    var clickedSquare = parseInt($(this)[0].id);
    if(!checkSpot(clickedSquare)){
      player1.fillSpot(clickedSquare)
      printBoard();
      if(check()) return

      var squareChoice;
      if (player1.spotsFilled.length === 1 && player1.spotsFilled[0] === 5){
        console.log(player1.spotsFilled.length)
        squareChoice = player2.fillNonCorner()
      } else {
        squareChoice = autoFill();
      }
      player2.fillSpot(squareChoice);
      printBoard();

      if(check()) return
    }
  })

  $(".refresh").click(function(event) {
    $("#winDisplay").hide();
    player1.spotsFilled = [];
    player2.spotsFilled = [];
    switchTurn()
    emptyBoard();
  })
})
