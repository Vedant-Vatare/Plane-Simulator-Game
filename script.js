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
  console.log(e.key)
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
});

window.addEventListener("keyup", (e) => {
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

  if (movingLeft && playerX > 120) {
    player.style.left = playerX - playerSpeed + "px";
  }

  if (movingRight && playerX + playerWidth < playAreaWidth + 70) {
    player.style.left = playerX + playerSpeed + "px";
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
