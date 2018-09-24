const endpoints = {
  move: "/api/move",
  newGame: "/api/new-game",
}

const markedClassName = "marked";

const jsonPostPayload = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  }
}

let state = {}

const makeRequest = (url, payload, callback) => {
  fetch(url, payload)
    .then(response => response.json()) 
    .then(data => callback(data));
}

const newGameRequest = (id) => {
  let payload = jsonPostPayload;
  payload.body = state;
  payload.body.gameType = id;
  payload.body = JSON.stringify(payload.body);
  makeRequest(endpoints.newGame, payload, updateState);
}

const makeMoveRequest = (idx) => {  
  let payload = jsonPostPayload;
  payload.body = state;
  payload.body.selectedIdx = idx;
  payload.body = JSON.stringify(payload.body);

  makeRequest(endpoints.move, payload, updateState);
}

const handleSpaceClick = (space, idx) => {
  if (space.classList.contains(markedClassName)) return;
  makeMoveRequest(idx);
}

const aiMoveRequest = () => {
  let payload = jsonPostPayload;
  payload.body = JSON.stringify(state);
  makeRequest(endpoints.move, payload, updateState);
}

const getCurrentPlayerType = (currentPlayerMark) => {
  return state[currentPlayerMark];
}

const updateState = (data) => {
  updateBoard(data.board);
  state.currentPlayerMark = switchCurrentPlayer(state.currentPlayerMark);
  state.O = data.O;
  state.X = data.X;
  if (getCurrentPlayerType(state.currentPlayerMark) === "ai") {
    aiMoveRequest();
  }
}

const updateClassList = (space, idx) => {
  updatedClassList = space.classList;
  if (state.board[idx] != null) updatedClassList.add(markedClassName);
  return updatedClassList
}

const updateSpace = (space, idx) => {
  space.innerText = state.board[idx];
  space.classList = updateClassList(space, idx);
}

const updateBoard = (updatedBoard) => {
  state.board = updatedBoard;
  spaces.forEach((space, idx) => {
    updateSpace(space, idx);
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
  space.addEventListener("click", () => handleSpaceClick(space, idx));
});
