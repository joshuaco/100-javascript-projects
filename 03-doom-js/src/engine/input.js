function inputHandler(player) {
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        player.moveForward();
        break;
      case 'ArrowDown':
        player.moveBackward();
        break;
      case 'ArrowLeft':
        player.moveLeft();
        break;
      case 'ArrowRight':
        player.moveRight();
        break;
      default:
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        player.moveStop();
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        player.rotateStop();
        break;
      default:
        break;
    }
  });
}

export default inputHandler;
