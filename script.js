const gameBoard = document.querySelector(".game_board");
const obstacles = document.querySelector(".obstacles");
const player = document.querySelector("#player-plane");
const playArea = document.querySelector(".play_area");
const playerWidth = player.clientWidth;
const playAreaWidth = playArea.clientWidth;
const playAreaHeight = playArea.clientHeight;
let targetDuration = 1500;
document.documentElement.style.setProperty("--target-speed", targetDuration + "ms")
let playerSpeed = 25;
let movingRight = false;
let movingUp = false;
let movingLeft = false;
let movingDown = false;
let animationFrameId;

// checking for touch device:
if (navigator.maxTouchPoints > 0) {
  console.log('touch deviced detected');
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

// function randomCoords() {}
// function shootRocket() {
//   let elem = document.createElement("img");
//   elem.setAttribute("src", "rocket.svg");
//   elem.className = "target rocket";
//   obstacles.appendChild(elem);
//   removeTarget(elem);
// }

// class createnemy {}
// function removeTarget(target) {
//   setTimeout(() => {
//     target.remove();
//   }, targetDuration + 500);
// }
