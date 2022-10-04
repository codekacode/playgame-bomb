const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvaSize);
window.addEventListener("resize", setCanvaSize);

let canvaSize;
let elementSize;

function startGame() {
  // game.fillRect(0, 0, 100, 100);
  // game.clearRect(0, 0, 50, 50);
  // game.fillStyle = "purple";
  // game.textAlign = "left";
  // game.fillText("Codeka", 20, 20);

  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  // console.log(mapRows);
  // console.log(mapRowCols);

  mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementSize * (colIndex + 1);
      const posY = elementSize * (rowIndex + 1);
      game.fillText(emoji, posX, posY);
    });
  });

  // for (let row = 1; row <= 10; row++) {
  //   for (let col = 1; col <= 10; col++) {
  //     game.fillText(
  //       emojis[mapRowCols[row - 1][col - 1]],
  //       elementSize * col,
  //       elementSize * row
  //     );
  //   }
  // }
}

function setCanvaSize() {
  if (window.innerHeight > window.innerWidth) {
    canvaSize = window.innerWidth * 0.8;
  } else {
    canvaSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvaSize);
  canvas.setAttribute("height", canvaSize);

  elementSize = canvaSize / 10;
  startGame();
}
