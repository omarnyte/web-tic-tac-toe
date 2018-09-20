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
    .then(data => renderBoard(data));
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  const id = button.getAttribute("id");
  button.addEventListener("click", () => newGameRequest(id));
});

