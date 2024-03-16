const gameBoard = document.querySelector(".game_board");
const obstacles = document.querySelector('.obstacles');
const player = document.querySelector('#player-plane');
const playArea = document.querySelector('.play_area');
const playerWidth = player.clientWidth;
const playAreaWidth = playArea.clientWidth;
const playAreaHeight = playArea.clientHeight;
// let targetDuration = 4000;
// document.documentElement.style.setProperty("--target-speed", targetDuration)
let playerSpeed = 25; 
let movingRight = false;
let movingUp = false;
let movingLeft = false;
let movingDown = false;
let animationFrameId;

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        movingLeft = true;
        console.log("MovingLeft is True")
    }
    if (e.key === "ArrowRight") {
        movingRight = true;
        console.log("Movingright is True")
    }
    if (e.key === "ArrowUp") {
        movingUp = true;
        console.log("MovingUp is True")
    }
    if (e.key === "ArrowDown") {
        movingDown = true;
        console.log("Movingdown is True")
    }

    // Start the animation loop only if it's not already running
    if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(movePlayer);
        console.log("in keydown animationfram condition!");
    }
});

window.addEventListener("keyup", (e) => {
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
        console.log("@160 CancelAnimatnFrame for animationFrameId")
        animationFrameId = undefined;
    }
})
function updateGame() {
    movePlayer();
    animationFrameId = window.requestAnimationFrame(updateGame);
    console.log("in updateGame fun.");
}
function movePlayer() {
    const playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    const playerY = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));

    if (movingLeft && playerX > 60) {
        player.style.left = playerX - playerSpeed + "px";
    }

    if (movingRight && playerX + playerWidth < (playAreaWidth - 20)) {
        player.style.left = playerX + playerSpeed + "px";
    }

    if (movingUp && playerY > 0) {
        player.style.top = playerY - playerSpeed + "px";
    }

    if (movingDown && playerY + player.clientHeight < playAreaHeight) {
        player.style.top = playerY + playerSpeed + "px";
    }
}

function randomCoords(){
 // targets should be at any left property
}
function shootRocket(){
   let elem = document.createElement('img');
   elem.setAttribute('src',"rocket.svg");
   elem.className = "target rocket";
   obstacles.appendChild(elem);
   removeTarget(elem);
}

class createnemy {
  
}
function removeTarget(target){
    setTimeout(()=>{
        target.remove();
    }, targetDuration + 500)
}