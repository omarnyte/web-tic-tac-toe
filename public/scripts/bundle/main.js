/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/scripts/main.js":
/*!********************************!*\
  !*** ./public/scripts/main.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./public/scripts/request.js");


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
    _request__WEBPACK_IMPORTED_MODULE_0__["aiMoveRequest"](state, updateState);
  }

  updateDisplay(data.players.currentPlayerMark);
}

const handleSpaceClick = (space, idx) => {
  if (space.classList.contains(markedClassName)) return;
  _request__WEBPACK_IMPORTED_MODULE_0__["makeMoveRequest"](idx, state, updateState);
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  const id = button.getAttribute("id");
  button.addEventListener("click", () => _request__WEBPACK_IMPORTED_MODULE_0__["newGameRequest"](id, state, updateState));
});

const spaces = document.querySelectorAll(".space");
spaces.forEach(space => {
  const idx = space.dataset.idx;
  space.addEventListener("click", () => handleSpaceClick(space, idx));
});


/***/ }),

/***/ "./public/scripts/request.js":
/*!***********************************!*\
  !*** ./public/scripts/request.js ***!
  \***********************************/
/*! exports provided: newGameRequest, makeMoveRequest, aiMoveRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newGameRequest", function() { return newGameRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeMoveRequest", function() { return makeMoveRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aiMoveRequest", function() { return aiMoveRequest; });
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

const newGameRequest = (id, state, callback) => {
  let payload = jsonPostPayload;
  payload.body = state;
  payload.body.gameType = id;
  payload.body = JSON.stringify(payload.body);
  makeRequest(endpoints.newGame, payload, callback);
}

const makeMoveRequest = (idx, state, callback) => {  
  let payload = jsonPostPayload;
  payload.body = state;
  payload.body.selectedIdx = idx;
  payload.body = JSON.stringify(payload.body);

  makeRequest(endpoints.move, payload, callback);
}

const aiMoveRequest = (state, callback) => {
  let payload = jsonPostPayload;
  payload.body = JSON.stringify(state);
  makeRequest(endpoints.move, payload, callback);
}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map