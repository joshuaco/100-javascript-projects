import { ctx } from './renderer.js';

function logs(txt, value, x, y) {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`${txt}: ${value.toFixed(2)}°`, x, y);
}

export default logs;
