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

  draw(offsetX, offsetY, scale) {
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
          offsetX + x * this.widthTiles * scale,
          offsetY + y * this.heightTiles * scale,
          this.widthTiles * scale,
          this.heightTiles * scale
        );
      }
    }
  }

  drawPlayer(player, offsetX, offsetY, scale) {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      offsetX + player.x * scale - 3,
      offsetY + player.y * scale - 3,
      6,
      6
    );

    this.#drawPlayerDirectionLine(player, offsetX, offsetY, scale);
  }

  #drawPlayerDirectionLine(player, offsetX, offsetY, scale) {
    const directionX = offsetX + player.x * scale;
    const directionY = offsetY + player.y * scale;

    this.ctx.beginPath();
    this.ctx.moveTo(directionX, directionY);
    this.ctx.lineTo(
      directionX + Math.cos(player.rotationAngle) * 20,
      directionY + Math.sin(player.rotationAngle) * 20
    );
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
  }
}

export default Level;
