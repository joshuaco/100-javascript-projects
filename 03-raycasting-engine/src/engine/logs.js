function logs(ctx, player) {
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`A: ${player.rotationAngle.toFixed(2)}°`, 10, 30);
}

export default logs;
