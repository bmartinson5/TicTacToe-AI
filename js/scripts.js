var player1 = new Player("X");
var player2 = new Computer("O");
var turn = player1;
var gameOver;
var notTurn = player2;
var spotsNext = [ [[5,7], 3] , [[1,2],3], [[4,5],6], [[7,8],9], [[3,6],9], [[1,4],7], [[2,5],8],
                [[3, 5], 7], [[2,3],1],[[5,6],4],[[8,9],7],[[6,9],3],[[4,7],1],[[5,8],2],[[1,7],4],
                [[1,3],2],[[1,9],5],[[3,9],6],[[3,7],5],[[4,6],5],[[7,9],8],[[2,8],5], [[1,5],9]];

var edgesBlockFork = [[[2,4],1], [[2,6],3], [[4,8],7],[[6,8],9]]
var nonCorners = [2,4,6,8];
var cornerSpots = [1,3,7,9];
var oppositeCorner = [9,7,3,1];
var edgeSpots = [2,4,6,8];
var oppositeEdges = [8,6,4,2];
var possibleWins = [[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,6,9],[3,5,7],[4,5,6],[7,8,9]]



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

Computer.prototype.checkForOpponentWin = function(arr1, arr2){
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

Computer.prototype.fillCorner = function(corners){
  var result = 0;
  corners.forEach(function(spot){
    if(!player1.spotsFilled.includes(spot) && !player2.spotsFilled.includes(spot)){
      console.log(spot);
      result = spot;
    }
  })
  return result;
}

Computer.prototype.fillCenter = function(){
  if(!player1.spotsFilled.includes(5) && !player2.spotsFilled.includes(5))
    return 5
  else {
    return 0;
  }
}

Computer.prototype.oppositeCorner = function(){
  var result = 0;
  player1.spotsFilled.forEach(function(spot, idx){
    if(cornerSpots.includes(spot) && !checkSpot(spot)){
      console.log("oppositeCorner");
      result = oppositeCorner[idx]
    }
  })
  return result
}

Computer.prototype.blockFork = function(){
  result = 0;
  //if second move, must react accordingly
  if(player1.spotsFilled.length === 2) {
    //if first user move was a corner, second computer move must be edge with empty oppositeEdge
    if(cornerSpots.includes(player1.spotsFilled[0])){
      edgeSpots.forEach(function(edge, idx){
        if(!player1.spotsFilled.includes(oppositeEdges[idx]))
          result = edge;
      })
    }
    else if(edgeSpots.includes(player1.spotsFilled[0]) && edgeSpots.includes(player1.spotsFilled[1])){
      result = player2.blockEdgeFork();
    }
  }
  return result;

}

Computer.prototype.blockEdgeFork = function(){
  var res = 0;
  edgesBlockFork.forEach(function(ele){
    if(player1.spotsFilled.includes(ele[0][0]) && player1.spotsFilled.includes(ele[0][1])){
      res = ele[1]
    }
  })
  return res;
}




function emptyBoard(){
  for(let i = 1; i <= 9; ++i){
    $("#g-" + i).text("")
    $("#g-" + i).hide("")
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


function switchTurn(){
  var temp = turn;
  turn = notTurn;
  notTurn = temp;
}

function checkWin(player){
  var result = false
  possibleWins.forEach(function(possibleWin){
    if(player.spotsFilled.includes(possibleWin[0]) && player.spotsFilled.includes(possibleWin[1])
      && player.spotsFilled.includes(possibleWin[2])){
        result = true
        colorWin(possibleWin);
      }
  })
  return result
}

function colorWin(winningSpots){
  winningSpots.forEach(function(spot){
    console.log(spot);
    $("#g-"+spot).addClass("color-win");
  })
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
Computer.prototype.autoFill = function(){
  var arr1 = player1.spotsFilled
  var arr2 = player2.spotsFilled

  return player2.checkForOpponentWin(arr2, arr1) || player2.checkForOpponentWin(arr1, arr2) || player2.blockFork() ||
                     player2.fillCenter() || player2.oppositeCorner() || player2.fillCorner(cornerSpots) ||
                     player2.fillCorner(nonCorners)
}

function check(turn){

  if(checkWin(turn)){
    $("#winDisplay").show()
    $("#winPlayerPar").show();
    $("#winPlayer").text(turn.symbol+"'s have ")
    gameOver = true;
    return true;
  }
  if(player1.spotsFilled.length === 5 || player2.spotsFilled.length === 5){
    $("#winDisplay").show();
    $("#winPlayerPar").show();
    $("#winPlayer").text("Nobody has ")
    gameOver = true;
    return true;
  }
    console.log("here");
    switchTurn();
  return false;

}

$(document).ready(function(){
  printBoard();
  gameOver = false

  $(".grid-item").click(function(){
    if(gameOver) return
    var clickedSquare = parseInt($(this)[0].id);

    if(!checkSpot(clickedSquare)){
      player1.fillSpot(clickedSquare)
      $("#g-" + clickedSquare).text(player1.symbol)
      $("#g-" + clickedSquare).show()

      if(check(player1))
        return

      //computer starts turn
      var squareChoice = player2.autoFill();
      player2.fillSpot(squareChoice);
      $("#g-" + squareChoice).text(player2.symbol)
      $("#g-" + squareChoice).fadeIn(600)
      if(check(player2))
        return
    }
  })

  $(".refresh").click(function(event) {
    gameOver = false;
    $("#winDisplay").hide();
    player1.spotsFilled = [];
    player2.spotsFilled = [];
    $("p").removeClass("color-win")
    //switchTurn();
    emptyBoard();
  })
})
