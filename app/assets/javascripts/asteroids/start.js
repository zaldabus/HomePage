(function(root) {
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  $(document).ready(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    AsteroidsGame.currentGame = new AsteroidsGame.Game(ctx)
    AsteroidsGame.currentGame.start();
  });

})(this);