const squares = document.querySelectorAll(".square");
const statusText = document.querySelector(".statusText");
const restartButton = document.getElementById("restartButton");
const finalScoreX = document.getElementById("scoreX");
const finalScoreO = document.getElementById("scoreO");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let playing = false;
let scoreX = "";
let scoreO = "";

initializeGame();

function initializeGame() {
  squares.forEach((square) => square.addEventListener("click", squareClicked));
  restartButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s Turn`;
  playing = true;
}
function squareClicked() {
  const squareIndex = this.getAttribute("squareIndex");
  if (options[squareIndex] != "" || !playing) {
    return;
  }
  updateSquare(this, squareIndex);
  checkWinner();
}
function updateSquare(square, index) {
  options[index] = currentPlayer;
  square.textContent = currentPlayer;
  if (square.textContent == "O") {
    square.style.color = "#c61515";
  } else {
    square.style.color = "#189541";
  }
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}
function checkWinner() {
  let roundWon = false;
  for (i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const squareA = options[condition[0]];
    const squareB = options[condition[1]];
    const squareC = options[condition[2]];
    if (squareA == "" || squareB == "" || squareC == "") {
      continue;
    } else if (squareA == "X" && squareA == squareB && squareB == squareC) {
      roundWon = true;
      scoreX++;
      finalScoreX.textContent = `X : ${scoreX}`;
      squares.forEach((square) => {
        square.classList.add("wonSquare");
      });
      break;
    } else if (squareA == "O" && squareA == squareB && squareB == squareC) {
      roundWon = true;
      scoreO++;
      finalScoreO.textContent = `${scoreO} : O`;
      squares.forEach((square) => {
        square.classList.add("wonSquare");
      });
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    playing = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw 🎏`;
  } else {
    changePlayer();
  }
}
function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  if (currentPlayer == "X") {
    currentPlayer = "X";
  } else if (currentPlayer == "O") {
    currentPlayer = "O";
  }
  statusText.textContent = `${currentPlayer}'s Turn`;
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("wonSquare");
  });
  playing = true;
}
