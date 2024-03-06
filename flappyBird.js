// Flappy Bird game variables
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const bird = {
  x: 50,
  y: canvas.height / 2,
  radius: 20,
  velocity: 0,
  gravity: 0.5,
  jumpHeight: -10
};
const pipes = [];
let score = 0;
let gameInterval;

// Event listener for keyboard input
document.addEventListener("keydown", flapBird);

// Function to start the game
function startGame() {
  resetGame();
  gameInterval = setInterval(updateGame, 20);
}

// Function to reset the game
function resetGame() {
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  pipes.length = 0;
  score = 0;
}

// Function to update the game state
function updateGame() {
  clearCanvas();
  updateBird();
  updatePipes();
  drawBird();
  drawPipes();
  drawScore();

  if (isCollision()) {
    endGame();
  }
}

// Function to handle bird's jump
function flapBird() {
  bird.velocity = bird.jumpHeight;
}

// Function to update bird's position and velocity
function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
}

// Function to create new pipes
function createPipes() {
  const pipeGap = 100;
  const pipeWidth = 50;
  const minHeight = 50;
  const maxHeight = canvas.height - pipeGap - minHeight;
  const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

  pipes.push({
    x: canvas.width,
    y: 0,
    width: pipeWidth,
    height: height
  });

  pipes.push({
    x: canvas.width,
    y: height + pipeGap,
    width: pipeWidth,
    height: canvas.height - height - pipeGap
  });
}

// Function to update pipe positions
function updatePipes() {
  if (pipes.length === 0 || pipes[pipes.length - 2].x < canvas.width - 200) {
    createPipes();
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;

    if (pipes[i].x + pipes[i].width === 0) {
      pipes.splice(i, 2);
      score++;
    }
  }
}

// Function to check collision between bird and pipes
function isCollision() {
  for (let i = 0; i < pipes.length; i++) {
    if (
      bird.x + bird.radius > pipes[i].x &&
      bird.x - bird.radius < pipes[i].x + pipes[i].width &&
      (bird.y - bird.radius < pipes[i].y ||
        bird.y + bird.radius > pipes[i].y + pipes[i].height)
    ) {
      return true;
    }
  }

  return bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0;
}

// Function to end the game
function endGame() {
  clearInterval(gameInterval);
  alert("Game Over. Your score: " + score);
  startGame();
}

// Function to draw the bird
function drawBird() {
  context.fillStyle = "#f00";
  context.beginPath();
  context.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  context.fill();
}

// Function to draw the pipes
function drawPipes() {
  context.fillStyle = "#0f0";

  for (let i = 0; i < pipes.length; i++) {
    context.fillRect(pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);
  }
}

// Function to draw the score
function drawScore() {
  context.fillStyle = "#000";
  context.font = "20px Arial";
  context.fillText("Score: " + score, 10, 30);
}

// Function to clear the canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Start the game
startGame();






