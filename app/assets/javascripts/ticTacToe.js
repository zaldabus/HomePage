(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function TTT(displayGrid) {
    this.player = Game.marks[0];
    this.board = this.makeBoard();
    this.displayGrid = displayGrid;
  }

  Game.marks = ["X", "O"];

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };


  Game.prototype.horizontalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.verticalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.placeMark = function (pos) {
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  Game.prototype.makeMove = function($li) {
    this.render($li);
    var id = parseInt($li.attr("id"));
    var coords = this.getCoordinates(id)
    this.placeMark(coords);
    if (this.winner()) {
      var $lis = this.displayGrid.children();
      $lis.each(function(index, li){
        $(li).addClass("clicked");
        $(li).off('click');
      })
      console.log("You won but you'll never know!");
    }
    else{
      this.switchPlayer();
    }
  }

  Game.prototype.render = function($li) {
    $li.append(this.player);
    $li.addClass("clicked");
    $li.off('click');
  }

  Game.prototype.getCoordinates = function(id) {
    var counter = 1
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board.length; j++) {
        if(counter === id){
          return [i, (2 - j)];
        }
        counter ++;
      }
    }

  }
})(this);