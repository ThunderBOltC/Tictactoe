let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let gameActive = true;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


const cells = document.querySelectorAll('.cell');
let Message = document.getElementById('status');
const restartButton = document.getElementById('restartBtn');

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return; 
  }

  board[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;

  checkWinner();
  switchPlayer();
}

function switchPlayer() {
    if (!gameActive) return;
  currentPlayer = currentPlayer === "O" ? "X" : "O";
  Message.innerText = `Player tictic ${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] === "" || board[b] === "" || board[c] === "") {
      continue;
    }
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

    if (roundWon) {
        console.log(`Player ${currentPlayer} has won!`);
    Message.innerText = `Player ${currentPlayer} has won`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    Message.innerText = `It's a tie!`;
    gameActive = false;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "O";
  Message.innerText = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.innerText = "");
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
