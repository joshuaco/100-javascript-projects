import Level from './classes/Level.js';
import { LEVEL1 } from './constants/levels.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const map = new Level(canvas, ctx, LEVEL1);

console.log(map);

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  main();

  requestAnimationFrame(gameLoop);
};

const main = () => {
  map.draw();
};

gameLoop();
