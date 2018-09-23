let board = [null, null, null, null, null, null, null, null, null];
let currentPlayerMark;
let X;
let O;

const newGameRequest = (id) => {
  const newGameEndpoint = "/api/new-game";
  const method = "POST";
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    gameType: id
  });
  fetch(newGameEndpoint, {
    method,
    headers,
    body
  }).then(response => response.json()) 
    .then(data => updateState(data));
}

const moveRequest = (idx) => {
  const moveRequestEndpoint = "/api/move";
  const method = "POST";
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    board,
    currentPlayerMark,
    O,
    selectedIdx: idx, 
    X
  });
  fetch(moveRequestEndpoint, {
    method,
    headers,
    body
  }).then(response => response.json()) 
    .then(data => updateState(data));
}

const updateState = (data) => {
  updateBoard(data.board);
  currentPlayerMark = switchCurrentPlayer(currentPlayerMark);
  O = data.O;
  X = data.X;
}

const updateBoard = (updatedBoard) => {
  board = updatedBoard;
  spaces.forEach((space, idx) => {
    space.innerText = board[idx];
  });
}

const switchCurrentPlayer = (currentPlayerMark) => {
  return currentPlayerMark === "X" ? "O" : "X";
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  const id = button.getAttribute("id");
  button.addEventListener("click", () => newGameRequest(id));
});

const spaces = document.querySelectorAll(".space");
spaces.forEach(space => {
  const idx = space.dataset.idx;
  space.addEventListener("click", () => moveRequest(idx));
});
