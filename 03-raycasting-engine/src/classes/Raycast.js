class Raycast {
  constructor(ctx, map) {
    this.ctx = ctx;
    this.map = map;
    this.rays = 30;
  }

  castRay(x, y, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    let distance = 0;

    while (true) {
      const targetX = x + cos * distance;
      const targetY = y + sin * distance;

      if (
        this.map.colission(
          parseInt(targetX / this.map.widthTiles),
          parseInt(targetY / this.map.heightTiles)
        )
      ) {
        return { x: targetX, y: targetY, distance };
      }
      distance += 1;
    }
  }

  drawRay(x, y, angle) {
    const { x: targetX, y: targetY } = this.castRay(x, y, angle);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(targetX, targetY);
    this.ctx.strokeStyle = 'yellow';
    this.ctx.stroke();
  }
}

export default Raycast;
