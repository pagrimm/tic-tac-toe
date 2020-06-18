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
    this[x][y].mark = "x";  //$("#("this[x].concat[y]")".addClass("fas fa-times"));
  } else{
    this[x][y].mark = "o";
  }
}

Game.prototype.switchTurn = function() {
  this.turn = 1 - this.turn;
}

Game.prototype.declareWinner = function () {
  this.winner = this.turn;
}

function checkVertical(x, inputMark, game) {
  let count = 0;
  for (y = 0; y < game.board.dimension; y++) {
    if (game.board[x][y].mark === inputMark) {
      count += 1;
    }
  }
  if (count === game.board.dimension) {
    return true;
  } else {
    return false;
  }
}

function checkHorizontal(y, inputMark, game) {
  let count = 0;
  for (x = 0; x < game.board.dimension; x++) {
    if (game.board[x][y].mark === inputMark) {
      count += 1;
    }
  }
  if (count === game.board.dimension) {
    return true;
  } else {
    return false;
  }
}

function checkDiagonal(x, y, inputMark, game) {
  let count = 0;
  let count2 = 0;
  if (y === x) {
    for (i = 0; i < game.board.dimension; i++) {
      if (game.board[i][i].mark === inputMark) {
        count += 1;
      }
    }
  }
  if (y === (-x) + (game.board.dimension -1)) {
    for (i = 0; i < game.board.dimension; i++) {
      if (game.board[(-i) + (game.board.dimension - 1)][i].mark === inputMark) {
        count2 += 1;
      }
    }
  }
  if (count === game.board.dimension || count2 === game.board.dimension) {
    return true;
  } else {
    return false;
  }
}

function checkCatsGame(game) {
  for (x = 0; x < game.board.dimension; x++) {
    for (y = 0; y < game.board.dimension; y++) {
      if (game.board[x][y].mark.length === 0) {
        return false;
      }
    }
  }
  return true;
}

function displayMark (id, turn) {
  if (turn === 0) {
    $("#" + id + " .space-text").html("<i class=\"fas fa-times text-danger\"></i>");
  } else {
    $("#" + id + " .space-text").html("<i class=\"fas fa-circle text-info\"></i>");
  }
}

function displayTurn(turn) {
  $("#player" + turn + "-section").addClass("player" + turn + "-active");
  $("#player" + (1 - turn) + "-section").removeClass("player" + (1 - turn) + "-active");
}

function displayWinner (game) {
  console.log(game.winner);
  $(".game-board").after("<p class=\"delete player" + game.turn + "-color\">Player " + (game.turn + 1) + " wins!")
  document.querySelector("p.delete").scrollIntoView({behavior: 'smooth'});
}

function displayCatsGame () {
  $(".game-board").after("<p class=\"delete cats-game\">Cat's game!</p>")
  document.querySelector("p.delete").scrollIntoView({behavior: 'smooth'});
}

$(document).ready(function(){
  let board = new Board(3);
  let game = new Game(0, false, board);
  displayTurn(game.turn);
  $(".space").click(function () {
    if (game.winner === false) {
      let spaceId = $(this).attr("id")
      let spaceXy = spaceId.split("").map(str => parseInt(str));
      if (game.board[spaceXy[0]][spaceXy[1]].mark.length === 0) {
        board.addMark(spaceXy[0], spaceXy[1], game.turn);
        let inputMark = game.board[spaceXy[0]][spaceXy[1]].mark;
        displayMark(spaceId, game.turn);
        if (checkVertical(spaceXy[0], inputMark, game) || checkHorizontal(spaceXy[1], inputMark, game) || checkDiagonal(spaceXy[0], spaceXy[1], inputMark, game)) {
          game.declareWinner();
          displayWinner(game);
        } else if (checkCatsGame(game) === true) {
          displayCatsGame();
        } else {
          game.switchTurn();
          displayTurn(game.turn);
        }
      }
    }
  });
  $("#reset-button").click(function () {
    board = new Board(3);
    game = new Game(0, false, board);
    $(".space-text").each(function () {
      $(this).text("");
    });
    $(".delete").each(function () {
      $(this).remove();
    });
    displayTurn(game.turn);
  });
});