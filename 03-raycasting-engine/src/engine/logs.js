import { ctx } from './renderer.js';

function logs(txt, value) {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`${txt}: ${value.toFixed(2)}°`, 10, 30);
}

export default logs;
