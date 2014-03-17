(function(root) {
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var Ship = AsteroidsGame.Ship = function Ship() {
    AsteroidsGame.MovingObject.call(this, [250,250], [0,0], Ship.RADIUS, Ship.COLOR);
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "red";

  Ship.inherits(AsteroidsGame.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    if (this.vel[0] != 0 || this.vel[1] != 0 ) {
      var xVel = this.vel[0];
      var yVel = this.vel[1];

      var shipSpeed = Math.sqrt((xVel*xVel) + (yVel*yVel));
      var multiplier = AsteroidsGame.Bullet.SPEED / shipSpeed;

      var vel = [xVel * multiplier, yVel * multiplier];
      var pos = [this.pos[0], this.pos[1]];

      return new AsteroidsGame.Bullet(pos, vel, AsteroidsGame.currentGame);
    }
  }

})(this);