class Level {
  constructor(canvas, ctx, array) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.level = array;

    // map dimensions
    this.heightMap = this.level.length;
    this.widthMap = this.level[0].length;

    // canvas dimensions
    this.heightCanvas = this.canvas.height;
    this.widthCanvas = this.canvas.width;

    // tile dimensions
    this.heightTiles = parseInt(this.heightCanvas / this.heightMap);
    this.widthTiles = parseInt(this.widthCanvas / this.widthMap);
  }

  colission(x, y) {
    if (this.level[y][x] !== 0) {
      return true;
    }
    return false;
  }

  draw() {
    let color;

    for (let y = 0; y < this.heightMap; y++) {
      for (let x = 0; x < this.widthMap; x++) {
        if (this.level[y][x] === 1) {
          color = '#000';
        } else {
          color = '#fff';
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          x * this.widthTiles,
          y * this.heightTiles,
          this.widthTiles,
          this.heightTiles
        );
      }
    }
  }
}

export default Level;
