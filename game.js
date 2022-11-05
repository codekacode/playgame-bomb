const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");

window.addEventListener("load", setCanvaSize);
window.addEventListener("resize", setCanvaSize);

let canvaSize;
let elementSize;
let lives = 3;
let level = 0;

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemiesPosition = [];

function setCanvaSize() {
  if (window.innerHeight > window.innerWidth) {
    canvaSize = window.innerWidth * 0.6;
  } else {
    canvaSize = window.innerHeight * 0.6;
  }

  // canvasSize = Number(canvasSize.toFixed(0));
  canvas.setAttribute("width", canvaSize);
  canvas.setAttribute("height", canvaSize);

  elementSize = canvaSize / 10;
  console.log({ canvaSize, elementSize });
  startGame();
}

function startGame() {
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  if (!map){
    gameWin()
    return;
  }
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  
  enemiesPosition = [];

  game.clearRect(0, 0, canvaSize, canvaSize);
  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);
      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X"){
        enemiesPosition.push({ 
          x: posX, y: posY
        })
      }
      game.fillText(emoji, posX, posY);
    });
  });
  // flag = false;
  movePlayer();
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const giftCollisionY =
    playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const giftCollision = giftCollisionX && giftCollisionY;
  if (giftCollision) {
    levelWin()
    return
  }

  const enemyCollision = enemiesPosition.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY
  });

  if (enemyCollision) {
    console.log("bomba")
    levelFailed()
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function gameWin() {
  console.log("TERMINASTE EL JUEGO!");
}

function levelFailed() {
  lives--  
  if(lives <= 0){
    level = 0;
    lives = 3;
  } 
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveUp() {
  if (playerPosition.y - elementSize < 1) {
    console.log("OUT");
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }
}

function moveLeft() {
  if((playerPosition.x - elementSize) < 1){
    console.log('OUT')
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}

function moveRight() {
  if ((playerPosition.x + elementSize) > canvaSize) {
    console.log("que pasa")
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveDown() {
  if ((playerPosition.y + elementSize) > 600) {
    console.log("OUT");
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}

