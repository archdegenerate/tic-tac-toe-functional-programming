function createInitialState() {
  return {
    currentPlayerTurn: "X",
    movesCount: 0,
    board: Array.from({ length: 3 }, () => Array(3).fill(null)),
  };
}

function startGame() {
  let state = createInitialState();

  function updateState(row, col, state) {
    if (state.board[row][col] !== null) return state;

    const newBoard = state.board.map((rowArr, rowIndex) => {
      return rowArr.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return state.currentPlayerTurn;
        }
        return cell;
      });
    });

    const newState = {
      ...state,
      board: newBoard,
      currentPlayerTurn: state.currentPlayerTurn === "X" ? "O" : "X",
      movesCount: state.movesCount + 1,
    };

    const { winner, isDraw } = checkWin(newState);
    if (winner || isDraw) {
      newState.gameOver = true;
      newState.winner = winner;
    }

    return newState;
  }

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      state = updateState(row, col, state);

      applyStateToDOM(state);
    });
  });

  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    state = createInitialState();
    applyStateToDOM(state);
  });
}

function applyStateToDOM(state) {
  const tiles = document.querySelectorAll(".tile");
  state.board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const index = rowIndex * 3 + colIndex;
      tiles[index].textContent = cell;
    });
  });

  const turnDisplay = document.getElementById("current-turn");
  turnDisplay.textContent = `Current Turn: ${state.currentPlayerTurn}`;

  const { winner, isDraw } = checkWin(state);
  if (state.gameOver) {
    if (winner) {
      alert(`${winner} wins!`);
    } else if (isDraw) {
      alert("It's a draw!");
    }
  }
}

const playButton = document.getElementById("play");

playButton.addEventListener("click", startGame);

function checkWin(state) {
  const { board } = state;
  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      winner = board[i][0];
    }
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      winner = board[0][i];
    }
  }

  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    winner = board[0][0];
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    winner = board[0][2];
  }

  const isDraw = board.flat().every((cell) => cell !== null) && !winner;

  return { winner, isDraw };
}
