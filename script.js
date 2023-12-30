const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
let paddleY = (canvas.height - paddleHeight) / 2;

const computerPaddleWidth = 10;
const computerPaddleHeight = 100;
let computerPaddleY = (canvas.height - computerPaddleHeight) / 2;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let upPressed = false;
let downPressed = false;

let playerScore = 0;
let computerScore = 0;

let ballSpeedMultiplier = 1.0;

document.getElementById("easy").addEventListener("click", () => {
  ballSpeedMultiplier = 0.5;
});

document.getElementById("medium").addEventListener("click", () => {
  ballSpeedMultiplier = 1.0;
});

document.getElementById("hard").addEventListener("click", () => {
  ballSpeedMultiplier = 1.5;
});


function update() {
  if (upPressed && paddleY > 0) {
    paddleY -= 7;
  }
  if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 7;
  }

  if (ballY < computerPaddleY + computerPaddleHeight / 2) {
    computerPaddleY -= 5;
  } else {
    computerPaddleY += 5;
  }

  ballX += ballSpeedX * ballSpeedMultiplier;
  ballY += ballSpeedY * ballSpeedMultiplier;

  if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX - ballSize < paddleWidth) {
    if (ballY > paddleY && ballY < paddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      computerScore++;
      resetBall();
    }
  }

  if (ballX + ballSize > canvas.width - computerPaddleWidth) {
    if (ballY > computerPaddleY && ballY < computerPaddleY + computerPaddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      playerScore++;
      resetBall();
    }
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5;
  ballSpeedY = 5;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#fff";
  context.fillRect(0, paddleY, paddleWidth, paddleHeight);
  context.fillRect(
    canvas.width - computerPaddleWidth,
    computerPaddleY,
    computerPaddleWidth,
    computerPaddleHeight
  );

  context.beginPath();
  context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.font = "24px Arial";
  context.fillText(`Player: ${playerScore}`, 20, 30);
  context.fillText(`Computer: ${computerScore}`, canvas.width - 200, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    upPressed = true;
  }
  if (e.key === "ArrowDown") {
    downPressed = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    upPressed = false;
  }
  if (e.key === "ArrowDown") {
    downPressed = false;
  }
});

gameLoop();
