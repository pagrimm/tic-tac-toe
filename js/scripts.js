//y=x diag
//y=(-x)+n where n is the board dimension for anti-diag

function Board(dimension) {
  this.dimension = dimension;
  for (x = 0; x < dimension; x++) {
    this[x] = [];
    for (y = 0; y < dimension; y++) {
      let space = new Space(x, y);
      this[x].push(space);
    }
  }
}

function Space(x, y) {
  this.x = x,
  this.y = y,
  this.mark = ""
}

function Game(turn, winner, board) {
  this.turn = turn,
  this.winner = winner,
  this.board = board
}

Board.prototype.addMark = function(x, y, turn) {
  if (turn === 0) {
    this[x][y].mark = "x"
  } else{
    this[x][y].mark = "o"
  }
}

Game.prototype.switchTurn = function() {
  this.turn = 1 - this.turn;
}

Game.prototype.declareWinner = function () {
  this.winner = this.turn;
}

function displayMark (id, turn) {
  if (turn === 0) {
    $("#" + id).text("x");
  } else {
    $("#" + id).text("o");
  }
}


$(document).ready(function(){
  let board = new Board(3);
  let game = new Game(0, false, board);
  $(".space").click(function () {
    let spaceId = $(this).attr("id")
    let spaceXy = spaceId.split("")
    if (game.board[spaceXy[0]][spaceXy[1]].mark.length === 0) {
      board.addMark(spaceXy[0], spaceXy[1]);
      displayMark(spaceId, game.turn);
      game.switchTurn();
    }
  });
});