(function(root) {
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var Game = AsteroidsGame.Game = function Game(ctx) {
    this.ctx = ctx;
    this.asteroids = [AsteroidsGame.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y),
                      AsteroidsGame.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y),
                      AsteroidsGame.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y),
                      AsteroidsGame.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y),
                      AsteroidsGame.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y),
                      AsteroidsGame.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y)];
    this.ship = new AsteroidsGame.Ship();
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 30;

  Game.prototype.draw = function () {
    this.ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);

    var that = this;
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(that.ctx);
    });

    this.ship.draw(that.ctx);

    this.bullets.forEach(function(bullet) {
      bullet.draw(that.ctx);
    });

  };

  Game.prototype.move = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });

    this.ship.move();

    this.bullets.forEach(function(bullet) {
      bullet.move();
    });
  };

  Game.prototype.step = function () {
    this.move();
    this.draw();
    this.isOutofBounds();
    //turn this on when actually running the game
    this.checkCollisions();
  };

  Game.prototype.start = function () {
    this.bindKeyHandlers();
    this.AsteroidsGame.intervalId = setInterval(this.step.bind(this), Game.FPS);
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.asteroids.forEach(function(asteroid) {
       if (that.ship.isCollidedWith(asteroid)) {
         alert("Ship Collision! Game over!");
         that.stop();
       }
    })
  }

  Game.prototype.stop = function() {
    clearInterval(this.AsteroidsGame.intervalId);
  }

  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fireBullet();

    if (bullet) {
      this.bullets.push(bullet)
    };
  }

  Game.prototype.removeAsteroid = function (asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  };

  Game.prototype.removeBullet = function (bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key("up", function () { that.ship.power([0,-1])});
    key("down", function () { that.ship.power([0,1])});
    key("left", function () { that.ship.power([-1,0])});
    key("right", function () { that.ship.power([1,0])});

    key("space", function () { that.fireBullet() });
  }

  Game.prototype.isOutofBounds = function() {
    var that = this;
    this.asteroids.forEach(function(asteroid) {
      var x = asteroid.pos[0];
      var y = asteroid.pos[1];
      if (x > (Game.DIM_X + 20) || x < -20 || y > (Game.DIM_Y + 20) || y < -20) {
        asteroid.pos = [(Game.DIM_X - 5) - x, (Game.DIM_Y - 5) - y];
      }
    })
    this.bullets.forEach(function(bullet) {
      var x = bullet.pos[0];
      var y = bullet.pos[1];
      if (x > Game.DIM_X || x < 0 || y > Game.DIM_Y || y < 0) {
        var index = that.bullets.indexOf(bullet);
        that.bullets.splice(index, 1);
      }
    })

    var shipX = this.ship.pos[0];
    var shipY = this.ship.pos[1];
    if (shipX > Game.DIM_X || shipX < 0 || shipY > Game.DIM_Y || shipY < 0) {
      this.ship.pos = [Game.DIM_X - shipX, Game.DIM_Y - shipY];
    }
  }

})(this);