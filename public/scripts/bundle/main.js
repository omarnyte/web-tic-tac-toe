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

/***/ "./public/scripts/ai.js":
/*!******************************!*\
  !*** ./public/scripts/ai.js ***!
  \******************************/
/*! exports provided: isAi, handleAiTurn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAi", function() { return isAi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleAiTurn", function() { return handleAiTurn; });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./public/scripts/request.js");


const isAi = (playersState) => {
  const currentPlayerMark = playersState.currentPlayerMark;
  return playersState[currentPlayerMark] === "ai";
}

const handleAiTurn = (state, callback) => {
  const thinkingTime = Math.random() * 2000;
  sleep(thinkingTime).then(() => _request__WEBPACK_IMPORTED_MODULE_0__["makeAiMoveRequest"](state, callback));
}

const sleep  = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}


/***/ }),

/***/ "./public/scripts/main.js":
/*!********************************!*\
  !*** ./public/scripts/main.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai */ "./public/scripts/ai.js");
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ "./public/scripts/request.js");
/* harmony import */ var _statusDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statusDisplay */ "./public/scripts/statusDisplay.js");




const buttons = document.querySelectorAll("button");
const markedClassName = "marked";
const spaces = document.querySelectorAll(".space");

let state = {}

buttons.forEach(button => {
  const id = button.getAttribute("id");
  button.addEventListener("click", () => handleNewGameButtonClick(id));
});

const handleNewGameButtonClick = (id) => {
  _request__WEBPACK_IMPORTED_MODULE_1__["newGameRequest"](id, handleNewGameResponse);
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
  if (shouldMakeMove(state, space)) _request__WEBPACK_IMPORTED_MODULE_1__["makeMoveRequest"](idx, state, handleMoveResponse);
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
  _statusDisplay__WEBPACK_IMPORTED_MODULE_2__["updateStatusDisplay"](state);

  if (_ai__WEBPACK_IMPORTED_MODULE_0__["isAi"](state.players)) _ai__WEBPACK_IMPORTED_MODULE_0__["handleAiTurn"](state, updateGame);
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


/***/ }),

/***/ "./public/scripts/request.js":
/*!***********************************!*\
  !*** ./public/scripts/request.js ***!
  \***********************************/
/*! exports provided: newGameRequest, makeMoveRequest, makeAiMoveRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newGameRequest", function() { return newGameRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeMoveRequest", function() { return makeMoveRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeAiMoveRequest", function() { return makeAiMoveRequest; });
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

const newGameRequest = (id, callback) => {
  const body = JSON.stringify({gameType: id});
  const payload = {...jsonPostPayload, body};
  makeRequest(endpoints.newGame, payload, callback);
}

const makeMoveRequest = (idx, state, callback) => {  
  const body = JSON.stringify({...state, selectedIdx: idx});  
  const payload = {...jsonPostPayload, body}; 
  makeRequest(endpoints.move, payload, callback);
}

const makeAiMoveRequest = (state, callback) => {
  const body = JSON.stringify(state);
  const payload = {...jsonPostPayload, body};
  makeRequest(endpoints.move, payload, callback);
}

const makeRequest = (url, payload, callback) => {
  fetch(url, payload)
    .then(response => callback(response));
}


/***/ }),

/***/ "./public/scripts/statusDisplay.js":
/*!*****************************************!*\
  !*** ./public/scripts/statusDisplay.js ***!
  \*****************************************/
/*! exports provided: updateStatusDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStatusDisplay", function() { return updateStatusDisplay; });
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai */ "./public/scripts/ai.js");


const updateStatusDisplay = (state) => {
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
  return _ai__WEBPACK_IMPORTED_MODULE_0__["isAi"](playersState) ? generateAiTurnmessage(currentPlayerMark) : generateHumanTurnMessage(currentPlayerMark); 
}

const generateAiTurnmessage = (currentPlayerMark) => {
  return `${currentPlayerMark} is thinking.`;
}

const generateHumanTurnMessage = (currentPlayerMark) => {
  return `It's ${currentPlayerMark}'s turn.`;
}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map