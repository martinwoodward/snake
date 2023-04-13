const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

const boardSize = 400;
const squareSize = 20;

const snake = [{ x: 5, y: 5 }];
let direction = "right";
let food = { x: 10, y: 10 };
let score = 0;

function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * squareSize, segment.y * squareSize, squareSize, squareSize);
  });
}

function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

function checkCollisions() {
  const head = snake[0];
  if (head.x < 0 || head.x >= boardSize / squareSize || head.y < 0 || head.y >= boardSize / squareSize) {
    endGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      endGame();
    }
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (boardSize / squareSize)),
    y: Math.floor(Math.random() * (boardSize / squareSize)),
  };
}

function checkFoodCollision() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

function updateScore() {
  document.getElementById("score").innerText = score;
}

function updateGame() {
  ctx.clearRect(0, 0, boardSize, boardSize);
  drawSnake();
  if (checkFoodCollision()) {
    score++;
    generateFood();
  }
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * squareSize, food.y * squareSize, squareSize, squareSize);
  checkCollisions();
  updateScore();
}

function endGame() {
    clearInterval(gameLoop);
    document.getElementById("restart-button").style.display = "block";
    alert(`Game over! Your score is ${score}`);
  }

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "Enter":
      restartGame();
      break;
  }
}


function restartGame() {
    snake.length = 1;
    score = 0;
    snake[0] = { x: 5, y: 5 };
    direction = "right";
    generateFood();
    updateScore();
    document.getElementById("restart-button").style.display = "none";
    gameLoop = setInterval(() => {
      moveSnake();
      updateGame();
    }, 100);
}

function startGame() {
  generateFood();
  updateScore();
  updateScore();
  document.getElementById("restart-button").style.display = "none";
  document.addEventListener("keydown", handleKeyPress);
  gameLoop = setInterval(() => {
    moveSnake();
    updateGame();
  }, 100);
}

drawSnake();