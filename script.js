const gameBoard = document.querySelector(".game_board");
const obstacles = document.querySelector(".obstacles");
const player = document.querySelector("#player-plane");
const playArea = document.querySelector(".play_area");
// setting player limit fro moving left && right
const extremeLeft =
  (document.body.clientWidth - playArea.clientWidth + player.clientWidth) / 2;
const extremeRight =
  document.body.clientWidth - extremeLeft - player.clientWidth / 2;
let targetDuration = 2500;
document.documentElement.style.setProperty("--target-speed", targetDuration + "ms");
let playerSpeed = 35;
let movingLeft = false;
let movingRight = false;
let movingUp = false;
let movingDown = false;
let animationFrameId;
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") {
    movingLeft = true;
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    movingRight = true;
  }
  if (e.key === "ArrowUp" || e.key === "w") {
    movingUp = true;
  }
  if (e.key === "ArrowDown" || e.key === "s") {
    movingDown = true;
  }

  // Start the animation loop
  if (!animationFrameId) movePlayer();
});

window.addEventListener("keyup", (e) => {
  player.dataset.direction = "";
  if (e.key === "ArrowLeft" || e.key === "a") {
    movingLeft = false;
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    movingRight = false;
  }
  if (e.key === "ArrowUp" || e.key === "w") {
    movingUp = false;
  }
  if (e.key === "ArrowDown" || e.key === "s") {
    movingDown = false;
  }
  // Stop the animation loop when no keys are pressed
  if (!movingLeft && !movingRight && !movingUp && !movingDown) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
});

function movePlayer() {
  const playerX = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("left")
  );
  const playerY = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("top")
  );

  if (movingLeft && playerX > extremeLeft) {
    player.style.left = playerX - playerSpeed + "px";
  }

  if (movingRight && playerX < extremeRight) {
    player.style.left = playerX + playerSpeed + "px";
  }

  if (movingUp && playerY > 0) {
    player.style.top = playerY - playerSpeed + "px";
  }

  if (movingDown && playerY + player.clientHeight < playArea.clientHeight) {
    player.style.top = playerY + playerSpeed + "px";
  }
  animationFrameId = window.requestAnimationFrame(movePlayer);
}


