class Level {
  constructor(canvas, ctx, array) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.level = array;

    this.heightMap = this.level.length;
    this.widthMap = this.level[0].length;

    this.heightCanvas = this.canvas.height;
    this.widthCanvas = this.canvas.width;

    this.heightTiles = parseInt(this.heightCanvas / this.heightMap);
    this.widthTiles = parseInt(this.widthCanvas / this.widthMap);
  }
}

export default Level;
