import { normalize } from '../utils/math.js';
import Raycast from './Raycast.js';

class Player {
  constructor(ctx, level, x, y) {
    this.ctx = ctx;
    this.map = level;
    this.x = x;
    this.y = y;

    this.forward = 0; // 0=stand, 1=forward, -1=backward
    this.rotate = 0; // -1=left, 1=right

    this.rotationAngle = 0;
    this.rotationSpeed = (Math.PI / 180) * 3; // degrees per frame
    this.speed = 3; // pixels per frame

    this.raycast = new Raycast(ctx, level);
  }

  moveRight() {
    this.rotate = 1;
  }

  moveLeft() {
    this.rotate = -1;
  }

  moveForward() {
    this.forward = 1;
  }

  moveBackward() {
    this.forward = -1;
  }

  moveStop() {
    this.forward = 0;
  }

  rotateStop() {
    this.rotate = 0;
  }

  colission(x, y) {
    const tileX = parseInt(x / this.map.widthTiles);
    const tileY = parseInt(y / this.map.heightTiles);

    if (this.map.colission(tileX, tileY)) {
      return true;
    }
    return false;
  }

  #directonLine() {
    const directionX = this.x + Math.cos(this.rotationAngle) * 40;
    const directionY = this.y + Math.sin(this.rotationAngle) * 40;

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(directionX, directionY);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
  }

  update() {
    this.rotationAngle += this.rotate * this.rotationSpeed;

    const dx = Math.cos(this.rotationAngle) * this.speed * this.forward;
    const dy = Math.sin(this.rotationAngle) * this.speed * this.forward;

    if (!this.colission(this.x + dx, this.y)) {
      this.x += dx;
    }

    if (!this.colission(this.x, this.y + dy)) {
      this.y += dy;
    }

    this.rotationAngle = normalize(this.rotationAngle);
  }

  #drawRays() {
    for (let i = -this.raycast.rays; i < this.raycast.rays; i += 5) {
      const rayAngle = this.rotationAngle + (Math.PI / 180) * i;
      this.raycast.drawRay(this.x, this.y, rayAngle);
    }
  }

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x - 3, this.y - 3, 6, 6);

    this.#drawRays();
  }
}

export default Player;
