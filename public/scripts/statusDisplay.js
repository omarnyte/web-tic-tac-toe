import * as ai from "./ai";

export const updateStatusDisplay = (state) => {
  const displayDiv = document.querySelector(".display-div");
  if (state.gameOverState.isOver) {
    displayDiv.innerText = generateWinnerDisplayMessage(state.gameOverState);
  } else {
    displayDiv.innerText = generateTurnDisplay(state.players)
  }
}

const generateWinnerDisplayMessage = (gameOverState) => {
  const winner = gameOverState.winner;
  return (winner === null) ? "It's a tie!" : `${winner} wins!`;
}

const generateTurnDisplay = (playersState) => {
  let currentPlayerMark = playersState.currentPlayerMark;
  return ai.isAi(playersState) ? generateAiTurnmessage(currentPlayerMark) : generateHumanTurnMessage(currentPlayerMark); 
}

const generateAiTurnmessage = (currentPlayerMark) => {
  return `${currentPlayerMark} is thinking.`;
}

const generateHumanTurnMessage = (currentPlayerMark) => {
  return `It's ${currentPlayerMark}'s turn.`;
}
