const playButton = document.getElementById("play");
playButton.addEventListener("click", startGame);

function startGame() {
  const tiles = document.querySelectorAll(".tile");
  const resetButton = document.getElementById("reset");
  const turn = document.getElementById("current-turn");
  let currentPlayerTurn = "X";
  const boardSize = 3;
  let movesCount = 0;

  tiles.forEach((tile) =>
    tile.addEventListener("click", () => {
      if (tile.textContent === "") {
        tile.textContent = currentPlayerTurn;
        movesCount++;
        checkWin();
        currentPlayerTurn = currentPlayerTurn === "X" ? "O" : "X";
        turn.textContent = currentPlayerTurn;
      }
    })
  );

  function reset() {
    tiles.forEach((tile) => {
      tile.textContent = "";
    });
    currentPlayerTurn = "X";
    turn.textContent = currentPlayerTurn;
  }

  resetButton.addEventListener("click", reset);

  function checkWin() {
    let winner = null;

    for (let i = 0; i < boardSize; i++) {
      if (
        document.getElementById(`tile-${i}-0`).textContent !== "" &&
        document.getElementById(`tile-${i}-0`).textContent ===
          document.getElementById(`tile-${i}-1`).textContent &&
        document.getElementById(`tile-${i}-1`).textContent ===
          document.getElementById(`tile-${i}-2`).textContent
      ) {
        winner = document.getElementById(`tile-${i}-0`).textContent;
      }

      if (
        document.getElementById(`tile-0-${i}`).textContent !== "" &&
        document.getElementById(`tile-0-${i}`).textContent ===
          document.getElementById(`tile-1-${i}`).textContent &&
        document.getElementById(`tile-1-${i}`).textContent ===
          document.getElementById(`tile-2-${i}`).textContent
      ) {
        winner = document.getElementById(`tile-0-${i}`).textContent;
      }
    }

    if (
      document.getElementById("tile-0-0").textContent !== "" &&
      document.getElementById("tile-0-0").textContent ===
        document.getElementById("tile-1-1").textContent &&
      document.getElementById("tile-1-1").textContent ===
        document.getElementById("tile-2-2").textContent
    ) {
      winner = document.getElementById("tile-0-0").textContent;
    }

    if (
      document.getElementById("tile-0-2").textContent !== "" &&
      document.getElementById("tile-0-2").textContent ===
        document.getElementById("tile-1-1").textContent &&
      document.getElementById("tile-1-1").textContent ===
        document.getElementById("tile-2-0").textContent
    ) {
      winner = document.getElementById("tile-0-2").textContent;
    }

    if (winner) {
      alert(`${winner} wins!`);
      reset();
    } else if (movesCount === boardSize * boardSize) {
      alert("It's a draw!");
      reset();
    }
  }
}
