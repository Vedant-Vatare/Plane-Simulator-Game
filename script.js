const gameBoard = document.querySelector(".game_board");
const obstacles = document.querySelector(".obstacles");
const player = document.querySelector("#player-plane");
const playArea = document.querySelector(".play_area");
const playerWidth = player.clientWidth;
const playAreaWidth = playArea.clientWidth;
const playAreaHeight = playArea.clientHeight;
let targetDuration = 4000;
document.documentElement.style.setProperty("--target-speed", targetDuration);
let playerSpeed = 25;
let movingLeft = false;
let movingRight = false;
let movingUp = false;
let movingDown = false;
let animationFrameId;

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    movingLeft = true;
  }
  if (e.key === "ArrowRight") {
    movingRight = true;
  }
  if (e.key === "ArrowUp") {
    movingUp = true;
  }
  if (e.key === "ArrowDown") {
    movingDown = true;
  }

  // Start the animation loop only if it's not already running
  if (!animationFrameId) {
    movePlayer();
  }
});

window.addEventListener("keyup", (e) => {
  player.dataset.direction = "";
  if (e.key === "ArrowLeft") {
    movingLeft = false;
  }
  if (e.key === "ArrowRight") {
    movingRight = false;
  }
  if (e.key === "ArrowUp") {
    movingUp = false;
  }
  if (e.key === "ArrowDown") {
    movingDown = false;
  }
});

window.addEventListener("keyup", (e) => {
  // Stop the animation loop when no keys are pressed
  if (!movingLeft && !movingRight && !movingUp && !movingDown) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = undefined;
  }
});

function movePlayer() {
  const playerX = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("left")
  );
  const playerY = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("top")
  );

  if (movingLeft && playerX > 120) {
    console.log(playerX);
    player.style.left = playerX - playerSpeed + "px";
    console.log("moving left")
    player.dataset.direction = "movingLeft";
  }
  
  if (movingRight && playerX + playerWidth < playAreaWidth + 70) {
    player.style.left = playerX + playerSpeed + "px";
    console.log("moving right")
    player.dataset.direction = "movingRight";
  }

  if (movingUp && playerY > 0) {
    player.style.top = playerY - playerSpeed + "px";
  }

  if (movingDown && playerY + player.clientHeight < playAreaHeight) {
    player.style.top = playerY + playerSpeed + "px";
  }
  animationFrameId = window.requestAnimationFrame(movePlayer);
}

function randomCoords() {
  // targets should be at any left property
}
function shootRocket() {
  let elem = document.createElement("img");
  elem.setAttribute("src", "rocket.svg");
  elem.className = "target rocket";
  obstacles.appendChild(elem);
  removeTarget(elem);
}

function removeTarget(target) {
  setTimeout(() => {
    target.remove();
  }, targetDuration + 500);
}