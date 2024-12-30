import { convertToRadians, correctFishEye, normalize } from '../utils/math.js';
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

  #directionLine() {
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
      const rayAngle = convertToRadians(i) + this.rotationAngle;
      this.raycast.drawRay(this.x, this.y, rayAngle);
    }
  }

  #drawWallRays() {
    const numRays = this.map.widthCanvas;
    const fov = Math.PI / 3;
    const halfFov = fov / 2;
    const angleStep = fov / numRays;

    for (let i = 0; i < numRays; i++) {
      const rayAngle = this.rotationAngle - halfFov + i * angleStep;
      const { distance } = this.raycast.castRay(this.x, this.y, rayAngle);
      const correctedDistance = correctFishEye(
        distance,
        rayAngle,
        this.rotationAngle
      );

      const wallHeight = (this.map.heightCanvas / correctedDistance) * 50;

      // Calculate the x position of the wall
      const x = (i / numRays) * this.map.widthCanvas;

      // Draw the wall
      this.ctx.fillStyle = 'gray';
      this.ctx.fillRect(
        x,
        (this.map.heightCanvas - wallHeight) / 2,
        this.map.widthCanvas / numRays,
        wallHeight
      );
    }
  }

  #drawPlayer() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x - 3, this.y - 3, 6, 6);
  }

  draw() {
    this.#drawWallRays();
  }
}

export default Player;
