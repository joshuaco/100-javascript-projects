import Level from './classes/Level.js';
import Player from './classes/Player.js';
import inputHandler from './engine/input.js';
import { LEVEL1 } from './constants/levels.js';
import { canvas, ctx } from './engine/renderer.js';

const map = new Level(canvas, ctx, LEVEL1);
const player = new Player(ctx, map, 100, 100);

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
  player.update();
  map.draw(10, 10, 0.2);
  map.drawPlayer(player, 10, 10, 0.2);

  window.requestAnimationFrame(gameLoop);
};

const main = () => {
  gameLoop();
  inputHandler(player);
};

export default main;
