const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

canvas.width = 448;
canvas.height = 400;

// Game variables
let score = 0;

// Ball variables
const ballRadius = 4;
// Ball position
let x = canvas.width / 2;
let y = canvas.height - 30;
// Ball speed
let dx = 3;
let dy = -3;

// Paddle variables
const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

// Bricks variables
const brickRowCount = 6;
const brickColumnCount = 14;
const brickWidth = 30;
const brickHeight = 16;
const brickPadding = 0;
const brickOffsetTop = 30;
const brickOffsetLeft = 15;
const bricks = [];

const BRICK_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0,
};

function loadBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      // calculate brick position on screen
      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      // Assign a random color for each brick
      const random = Math.floor(Math.random() * 8); // 0-7
      // Save information of each brick
      bricks[c][r] = {
        x: brickX,
        y: brickY,
        status: BRICK_STATUS.ACTIVE,
        color: random,
      };
    }
  }
}

loadBricks();

function drawBall() {
  ctx.beginPath(); // Start drawing
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath(); // Stop drawing
}

function drawPaddle() {
  ctx.drawImage(
    $sprite, //imagen
    29, //clipX: coordenadas de recorte
    174, //ClipY
    paddleWidth, // Tamaño del recorte
    paddleHeight, // Tamaño del recorte
    paddleX, // Posición X del dibujo
    paddleY, // Posición Y del dibujo
    paddleWidth, // Ancho dibujo
    paddleHeight // Alto dibujo
  );
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];

      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      const clipX = currentBrick.color * 32;

      ctx.drawImage(
        $bricks,
        clipX,
        0,
        32,
        16,
        currentBrick.x,
        currentBrick.y,
        brickWidth,
        brickHeight
      );
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      const isBallSameAsBrickX =
        x + ballRadius > currentBrick.x &&
        x - ballRadius < currentBrick.x + brickWidth;

      const isBallSameAsBrickY =
        y + ballRadius > currentBrick.y &&
        y - ballRadius < currentBrick.y + brickHeight;

      if (isBallSameAsBrickX && isBallSameAsBrickY) {
        dy = -dy;
        currentBrick.status = BRICK_STATUS.DESTROYED;
      }
    }
  }
}

function ballMovement() {
  // Bounce ball on lateral walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Bounce ball on top wall
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  const isBallSameAsPaddleX =
    x + ballRadius > paddleX && x - ballRadius < paddleX + paddleWidth;

  // Touching the paddle
  const isBallSameAsPaddleY = y + dy - ballRadius > paddleY;

  // Touch the paddle
  if (isBallSameAsPaddleX && isBallSameAsPaddleY) {
    dy = -dy;
  }
  // Stop ball on bottom wall
  else if (y + dy > canvas.height - ballRadius) {
    console.log("Game over");

    // Reset ball
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 3;
    dy = -3;

    //loadBricks()
  }

  x += dx;
  y += dy;
}

function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function keyDownHandler(e) {
    const { key } = e;

    if (key === "Right" || key === "ArrowRight") {
      rightPressed = true;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    const { key } = e;

    if (key === "Right" || key === "ArrowRight") {
      rightPressed = false;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  cleanCanvas();

  drawBall();
  drawPaddle();
  drawBricks();

  collisionDetection();
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw);
}

draw();
initEvents();
