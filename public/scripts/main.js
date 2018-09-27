import * as ai from "./ai";
import * as request from "./request";
import * as statusDisplay from "./statusDisplay";

const buttons = document.querySelectorAll("button");
const markedClassName = "marked";
const spaces = document.querySelectorAll(".space");

let state = {}

buttons.forEach(button => {
  const id = button.getAttribute("id");
  button.addEventListener("click", () => handleNewGameButtonClick(id));
});

const handleNewGameButtonClick = (id) => {
  request.newGameRequest(id, handleNewGameResponse);
  resetSpaces();
}

const handleNewGameResponse = (response) => {
  if (response.ok) {
    updateGame(response);
  } else {
    window.alert("That game type is invalid. Please select another.");
  }
}

const resetSpaces = () => {
  spaces.forEach(space => {
    space.classList.remove(markedClassName);
    const idx = space.dataset.idx;
    space.addEventListener("click", () => handleSpaceClick(space, idx));
  });
}

const handleSpaceClick = (space, idx) => {
  if (shouldMakeMove(state, space)) request.makeMoveRequest(idx, state, handleMoveResponse);
}

const shouldMakeMove = (state, space) => {
  return !space.classList.contains(markedClassName) && !state.gameOverState.isOver && isHuman(state.players);
}

const isHuman = (playersState) => {
  const currentPlayerMark = playersState.currentPlayerMark;
  return playersState[currentPlayerMark] === "human";
}

const handleMoveResponse = (response) => {
  if (response.ok) {
    updateGame(response);
  } else {
    window.alert("That move is invalid. Please select another.");
  }
}

const updateGame = async (response) => {
  state = await response.json();
  updateBoard(state.board);
  statusDisplay.updateStatusDisplay(state);

  if (ai.isAi(state.players)) ai.handleAiTurn(state, updateGame);
}

const updateBoard = (updatedBoard) => {
  state.board = updatedBoard;
  spaces.forEach((space, idx) => {
    updateSpace(space, idx);
  });
}

const updateClassList = (space, idx) => {
  const updatedClassList = space.classList;
  if (state.board[idx] != null) updatedClassList.add(markedClassName);
  return updatedClassList
}

const updateSpace = (space, idx) => {
  space.innerText = state.board[idx];
  space.classList = updateClassList(space, idx);
}
