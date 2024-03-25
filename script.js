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
let movingRight = false;
let movingUp = false;
let movingLeft = false;
let movingDown = false;
let animationFrameId;

// checking for touch device:
if (navigator.maxTouchPoints > 0) {
  document.querySelector(".control-btns").style.display = "flex";
  addEvent(document.querySelector('#move-left'), "touchstart", 'touchend');
  addEvent(document.querySelector('#move-right'), "touchstart", 'touchend');
  addEvent(document.querySelector('#move-up'), "touchstart", 'touchend');
  addEvent(document.querySelector('#move-down'), "touchstart", 'touchend');
} else {
  addEvent(window, 'keydown', 'keyup')
}
function addEvent(element, pressed, released) {
  element.addEventListener(pressed, (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.target.id == "move-left") {
      movingLeft = true;
    }

    if (e.key === "ArrowRight" || e.key === "d" || e.target.id == "move-right") {
      movingRight = true;
    }

    if (e.key === "ArrowUp" || e.key === "w" || e.target.id == "move-up") {
      movingUp = true;
    }

    if (e.key === "ArrowDown" || e.key === "s" || e.target.id == "move-down") {
      movingDown = true;
    }

    // Start the animation loop
    if (!animationFrameId) movePlayer();
  });

  element.addEventListener(released, (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.target.id == "move-left") {
      movingLeft = false;
    }
    if (e.key === "ArrowRight" || e.key === "d" || e.target.id == "move-right") {
      movingRight = false;
    }
    if (e.key === "ArrowUp" || e.key === "w" || e.target.id == "move-up") {
      movingUp = false;
    }
    if (e.key === "ArrowDown" || e.key === "s" || e.target.id == "move-down") {
      movingDown = false;
    }
    // Stop the animation loop when no keys are pressed
    if (!movingLeft && !movingRight && !movingUp && !movingDown) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  });
}
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

