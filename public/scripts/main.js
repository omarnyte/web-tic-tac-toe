import * as request from "./request";

const markedClassName = "marked";

let state = {}

const updateClassList = (space, idx) => {
  const updatedClassList = space.classList;
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

const getCurrentPlayerType = (currentPlayerMark) => {
  return state.players[currentPlayerMark];
}

const isHuman = (currentPlayerMark) => {
  return state[currentPlayerMark] === "human";
}

const generateHumanTurnMessage = (currentPlayerMark) => {
  return "It's " + currentPlayerMark + "'s turn.";
}

const generateAiTurnmessage = (currentPlayerMark) => {
  return currentPlayerMark + " is thinking.";
}

const generateTurnDisplay = (currentPlayerMark) => {
  return isHuman(currentPlayerMark) ? generateHumanTurnMessage(currentPlayerMark) : generateAiTurnmessage(currentPlayerMark); 
}

const updateDisplay = (currentPlayerMark) => {
  const displayDiv = document.querySelector(".display-div");
  displayDiv.innerText = generateTurnDisplay(currentPlayerMark);
}

const updateState = (data) => {
  updateBoard(data.board);
  state = data;
  state.players.currentPlayerMark = data.players.currentPlayerMark;
  state.players.O = data.players.O;
  state.players.X = data.players.X;

  if (getCurrentPlayerType(data.players.currentPlayerMark) === "ai") {
    request.aiMoveRequest(state, updateState);
  }

  updateDisplay(data.players.currentPlayerMark);
}

const handleSpaceClick = (space, idx) => {
  if (space.classList.contains(markedClassName)) return;
  request.makeMoveRequest(idx, state, updateState);
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  const id = button.getAttribute("id");
  button.addEventListener("click", () => request.newGameRequest(id, state, updateState));
});

const spaces = document.querySelectorAll(".space");
spaces.forEach(space => {
  const idx = space.dataset.idx;
  space.addEventListener("click", () => handleSpaceClick(space, idx));
});
