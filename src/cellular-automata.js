(function(){

  var generateCave = function generateCave(width, height, seedStr, fill, steps, limiter, depht) {
    width = parseInt(width);
    height = parseInt(height);
    Seed.setValue(seedStr);
    fill = parseInt(fill);
    steps = parseInt(steps);
    limiter = parseInt(limiter);
    depht = parseInt(depht);


    // Declaring 2d array
    var map = new Array(width);
    for (var i = 0; i < width; i++) {
      map[i] = new Array(height);
    }


    // Random fill map array
    var RandomFillMap = function randomFillMap () {
      for (var x = 0; x < width; x ++) {
        for (var y = 0; y < height; y ++) {
          if (x == 0 || x == width-1 || y == 0 || y == height -1) {
            map[x][y] = 1;
          }
          else {
            var rand = Seed.random() * 100 << 0;
            map[x][y] = (rand < fill)? 1: 0;
          }
        }
      }
    }


    // Smooth map
    var SmoothMap = function SmoothMap() {
      for (var x = 0; x < width; x ++) {
        for (var y = 0; y < height; y ++) {
          var neighbourhoodCount = GetSurroundingNeighbours(x,y);

          if (neighbourhoodCount > limiter){
            map[x][y] = 1;
          }
          else if (neighbourhoodCount < limiter){
            map[x][y] = 0;
          }
        }
      }
    }


    var GetSurroundingNeighbours = function GetSurroundingNeighbours(gridX, gridY) {
      var count = 0;

      for (var neighbourX = gridX - depht; neighbourX <= gridX + depht; neighbourX ++) {
        for (var neighbourY = gridY - depht; neighbourY <= gridY + depht; neighbourY ++) {

          if (neighbourX >= 0 && neighbourX < width && neighbourY >= 0 && neighbourY < height) {
            if (neighbourX != gridX || neighbourY != gridY) {
              count += map[neighbourX][neighbourY];
            }
          }
          else {
            count ++;
          }

        }
      }

      return count;
    }


    // Draw map
    var
      canvas = document.getElementById("cave"),
      canvas_ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);

    var DrawMap = function drawMap() {
      for (var x = 0; x < width; x ++) {
        for (var y = 0; y < height; y ++) {
          drawPointHelper(canvas_ctx, x, y, width, height, map[x][y]);
        }
      }
    }



    RandomFillMap();

    for (var i = 0; i < steps; i ++) {
      SmoothMap();
    }

    DrawMap();
  }







  // Initiate script
  var init = function init(e) {
    var
      width = document.getElementById("cave_width").value || 200,
      height = document.getElementById("cave_height").value || 100,
      seed = document.getElementById("cave_seed").value || null,
      fill = document.getElementById("cave_fill").value || 47,
      steps = document.getElementById("cave_smooth_steps").value || 5,
      limiter = document.getElementById("cave_neighbourhood_limiter").value || 4,
      depht = document.getElementById("cave_neighbourhood_depht").value || 1

    generateCave(width, height, seed, fill, steps, limiter, depht);

    e.preventDefault();
  };

  document.getElementById("apply_cave_settings").addEventListener("submit", init);
  init()

})();