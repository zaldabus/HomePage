(function(root) {
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var Asteroid = AsteroidsGame.Asteroid = function Asteroid(pos, vel) {
    AsteroidsGame.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR)
  };

  Asteroid.COLOR = "grey";
  Asteroid.RADIUS = 20;

  Asteroid.inherits(AsteroidsGame.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var x = Math.random() * dimX;
    var y = Math.random() * dimY;

    var pos = [x, y];

    function randomVec() {
      var x = (Math.random() * 1) - (Math.random() * 1);
      var y = (Math.random() * 1) - (Math.random() * 1);
      var vel = [x, y];
      return vel;
    };

    return new Asteroid(pos, randomVec(), Asteroid.RADIUS, Asteroid.COLOR);
  };

})(this);

