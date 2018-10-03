import * as request from "./request";

export const isAi = (playersState) => {
  const currentPlayerMark = playersState.currentPlayerMark;
  return playersState[currentPlayerMark] === "ai";
}

export const handleAiTurn = (state, callback) => {
  const thinkingTime = Math.random() * 2000;
  sleep(thinkingTime).then(() => request.makeAiMoveRequest(state, callback));
}

const sleep  = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}
