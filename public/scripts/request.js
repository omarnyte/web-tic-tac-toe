const jsonPostPayload = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  }
}

const endpoints = {
  move: "/api/move",
  newGame: "/api/new-game",
}

export const newGameRequest = (id, callback) => {
  const body = JSON.stringify({gameType: id});
  const payload = {...jsonPostPayload, body};
  makeRequest(endpoints.newGame, payload, callback);
}

export const makeMoveRequest = (idx, state, callback) => {  
  const body = JSON.stringify({...state, selectedIdx: idx});  
  const payload = {...jsonPostPayload, body}; 
  makeRequest(endpoints.move, payload, callback);
}

export const makeAiMoveRequest = (state, callback) => {
  const body = JSON.stringify(state);
  const payload = {...jsonPostPayload, body};
  makeRequest(endpoints.move, payload, callback);
}

const makeRequest = (url, payload, callback) => {
  fetch(url, payload)
    .then(response => callback(response));
}
