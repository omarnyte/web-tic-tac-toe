export const newGameRequest = (id, state, callback) => {
  let payload = jsonPostPayload;
  payload.body = state;
  payload.body.gameType = id;
  payload.body = JSON.stringify(payload.body);
  makeRequest(endpoints.newGame, payload, callback);
}

export const makeMoveRequest = (idx, state, callback) => {  
  let payload = jsonPostPayload;
  payload.body = state;
  payload.body.selectedIdx = idx;
  payload.body = JSON.stringify(payload.body);

  makeRequest(endpoints.move, payload, callback);
}

export const aiMoveRequest = (state, callback) => {
  let payload = jsonPostPayload;
  payload.body = JSON.stringify(state);
  makeRequest(endpoints.move, payload, callback);
}

const endpoints = {
  move: "/api/move",
  newGame: "/api/new-game",
}

const makeRequest = (url, payload, callback) => {
  fetch(url, payload)
    .then(response => response.json()) 
    .then(data => callback(data));
}

const jsonPostPayload = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  }
}

