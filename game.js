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
let flag = true;
console.log({ canvaSize, elementSize });
const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};

const enemiesPosition = [];

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

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  
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
      } else if (col == "X" && flag){
        enemiesPosition.push({ 
          x: posX, y: posY
        })
      }
      console.log(enemiesPosition)
      game.fillText(emoji, posX, posY);
    });
  });
  flag = false;

  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 1; col <= 10; col++) {
  //     game.fillText(
  //       emojis[mapRowCols[row - 1][col - 1]],
  //       elementSize * col,
  //       elementSize * row
  //     );
  //   }
  // }
  movePlayer();
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const giftCollisionY =
    playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const giftCollision = giftCollisionX && giftCollisionY;
  console.log(giftPosition);
  if (giftCollision) {
    console.log("Subiste de nivel");
  }

  const enemyCollision = enemiesPosition.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
    const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
    return enemyCollisionX && enemyCollisionY
  });

  if (enemyCollision) {
    console.log("Chocaste con un enemigo");
  }
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
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
  if (playerPosition.x + elementSize > 600) {
    console.log("OUT");
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveDown() {
  if (playerPosition.y + elementSize > 600) {
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
