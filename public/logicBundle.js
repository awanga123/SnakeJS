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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend-api/actionTypes.js":
/*!*************************************!*\
  !*** ./frontend-api/actionTypes.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  CHANGE_GAME_STATE: 'CHANGE_GAME_STATE',\n  END_GAME: 'END_GAME',\n  START_GAME: 'START_GAME'\n};\n\n//# sourceURL=webpack:///./frontend-api/actionTypes.js?");

/***/ }),

/***/ "./frontend-api/api.js":
/*!*****************************!*\
  !*** ./frontend-api/api.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/* global window */\nvar store;\n\ntry {\n  store = window.store;\n} catch (e) {\n  store = global.store;\n}\n\nvar _require = __webpack_require__(/*! ./constants */ \"./frontend-api/constants.js\"),\n    WIDTH = _require.WIDTH,\n    HEIGHT = _require.HEIGHT;\n\nvar _require2 = __webpack_require__(/*! ./actionTypes */ \"./frontend-api/actionTypes.js\"),\n    END_GAME = _require2.END_GAME,\n    CHANGE_GAME_STATE = _require2.CHANGE_GAME_STATE,\n    START_GAME = _require2.START_GAME; // Constants used for differentiating body and food -- 0 is used for empty space\n\n\nvar SNAKE_BODY_ELEMENT = 1;\nvar FOOD_ELEMENT = 2;\n/**\n * Create a new blank grid of the specified proper size\n * NOTE that the grid is organized [row][col] or [y][x]\n *\n * @return {[[number]]} blank grid\n */\n\nfunction createBlank2dGrid() {\n  var blankState = [];\n\n  for (var i = 0; i < HEIGHT; i += 1) {\n    var row = [];\n\n    for (var j = 0; j < WIDTH; j += 1) {\n      row.push(0);\n    }\n\n    blankState.push(row);\n  }\n\n  return blankState;\n}\n/**\n * Update the game state to reflect the position of the snake and food\n *\n * @param {Snake}                    snake\n * @param {{ x: number, y: number }} food\n * @return void\n */\n\n\nfunction dispatchChangeGameState(snake, food) {\n  if (!snake) {\n    throw new Error('snake is undefined');\n  } else if (!snake.body) {\n    throw new Error('snake is defined does not have a body');\n  }\n\n  var newGameState = createBlank2dGrid();\n  snake.body.forEach(function (_ref) {\n    var x = _ref.x,\n        y = _ref.y;\n    newGameState[y][x] = SNAKE_BODY_ELEMENT;\n  });\n\n  if (food) {\n    newGameState[food.y][food.x] = FOOD_ELEMENT;\n  }\n\n  store.dispatch({\n    type: CHANGE_GAME_STATE,\n    newGameState: newGameState\n  });\n}\n/**\n * Dispatch a function to the frontend to signify the game has ended\n *\n * @return {void}\n */\n\n\nfunction dispatchEndGame() {\n  return store.dispatch({\n    type: END_GAME\n  });\n}\n/**\n * Dispatch a function to the frontend to signify the game has started\n *\n * @return {void}\n */\n\n\nfunction dispatchStartGame() {\n  return store.dispatch({\n    type: START_GAME\n  });\n}\n\nmodule.exports = {\n  dispatchChangeGameState: dispatchChangeGameState,\n  dispatchStartGame: dispatchStartGame,\n  dispatchEndGame: dispatchEndGame\n};\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./frontend-api/api.js?");

/***/ }),

/***/ "./frontend-api/constants.js":
/*!***********************************!*\
  !*** ./frontend-api/constants.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  WIDTH: 40\n  /* The number of columns on the board */\n  ,\n  HEIGHT: 30\n  /* The number of rows on the board */\n  ,\n  FRAME_RATE: 80\n  /* The number of milliseconds between game state updates */\n  ,\n  directions: {\n    UP: 'UP',\n    DOWN: 'DOWN',\n    LEFT: 'LEFT',\n    RIGHT: 'RIGHT'\n  }\n  /* keystroke directions */\n\n};\n\n//# sourceURL=webpack:///./frontend-api/constants.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* global window */\nvar _require = __webpack_require__(/*! ./frontend-api/api */ \"./frontend-api/api.js\"),\n    dispatchChangeGameState = _require.dispatchChangeGameState,\n    dispatchStartGame = _require.dispatchStartGame,\n    dispatchEndGame = _require.dispatchEndGame;\n\nvar _require2 = __webpack_require__(/*! ./frontend-api/constants */ \"./frontend-api/constants.js\"),\n    WIDTH = _require2.WIDTH,\n    HEIGHT = _require2.HEIGHT,\n    FRAME_RATE = _require2.FRAME_RATE,\n    _require2$directions = _require2.directions,\n    UP = _require2$directions.UP,\n    DOWN = _require2$directions.DOWN,\n    LEFT = _require2$directions.LEFT,\n    RIGHT = _require2$directions.RIGHT;\n/**\n * Note that we are using destructuring for our imports so that you can access\n * UP, DOWN, LEFT, and RIGHT directly as variables in your code below.\n *\n * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment\n *\n * The same goes for the WIDTH, HEIGHT, and FRAME_RATE variables which you will\n * take advantage of in your implementation below.\n *\n * Depending on your code editor, if you hover on these variables it will tell\n * you what type they are, though that shouldn't really matter for your\n * purposes. You can also open up the constants file to see what's going on\n * under the hood.\n */\n\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n * Don't worry about anything above this line :D                               *\n * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n\n/**\n * The snake is an array of body pieces which are located on the Game\n * each Game has one Snake\n */\n\n\nvar Snake =\n/*#__PURE__*/\nfunction () {\n  /**\n   * Create a new snake\n   *\n   * Initializes the body to be at the center of the game board\n   * Initializes this.body to be 5 items long vertically\n   * Initializes this.direction\n   * Binds move and changeDirection class methods to the Snake class\n   *\n   * @param  {number} w the number of columns in the board\n   * @param  {number} h the number of rows in the board\n   * @return {void}\n   */\n  function Snake(w, h) {\n    _classCallCheck(this, Snake);\n\n    if (!w || !h) {\n      throw new Error(\"You're missing either height or width for Snake\");\n    } //get the starting x and y coordinates\n\n\n    var xs = Math.floor(w / 2);\n    var ys = Math.floor(h / 2); //intialize body\n\n    this.body = [{\n      x: xs,\n      y: ys\n    }, {\n      x: xs,\n      y: ys + 1\n    }, {\n      x: xs,\n      y: ys + 2\n    }, {\n      x: xs,\n      y: ys + 3\n    }, {\n      x: xs,\n      y: ys + 4\n    }]; //initiliaze direction\n\n    this.direction = UP; //bind functions\n\n    this.move = this.move.bind(this);\n    this.changeDirection = this.changeDirection.bind(this);\n  }\n  /**\n   * Move the snake forwards in the proper direction\n   *\n   * @param  {boolean} grow if the snake just ate food and thus should be\n   *                        elongated by one square\n   * @return {void}\n   */\n\n\n  _createClass(Snake, [{\n    key: \"move\",\n    value: function move(grow) {\n      if (this.direction === UP) {\n        this.body.unshift({\n          x: this.body[0].x,\n          y: this.body[0].y - 1\n        });\n      } else if (this.direction === DOWN) {\n        this.body.unshift({\n          x: this.body[0].x,\n          y: this.body[0].y + 1\n        });\n      } else if (this.direction === LEFT) {\n        this.body.unshift({\n          x: this.body[0].x - 1,\n          y: this.body[0].y\n        });\n      } else if (this.direction === RIGHT) {\n        this.body.unshift({\n          x: this.body[0].x + 1,\n          y: this.body[0].y\n        });\n      }\n\n      if (!grow) {\n        this.body.pop();\n      }\n    }\n    /**\n     * Change the direction of the snake\n     *\n     * If the passed in direction is not UP, DOWN, LEFT, or RIGHT (constants\n     * which are defined above), throw an error.\n     *\n     * If the snake is moving in a certain direction and the user asks to move in\n     * the opposite direction, do not update the direction. That is to say, the\n     * snake can only make 90 degree turns.\n     *\n     * @throws                    error if invalid direction provided\n     * @param  {string} direction either UP, DOWN, LEFT, or RIGHT\n     * @return {void}\n     */\n\n  }, {\n    key: \"changeDirection\",\n    value: function changeDirection(direction) {\n      var directions = [UP, DOWN, LEFT, RIGHT]; // throws error if no direction provided\n\n      if (!directions.includes(direction)) {\n        throw new Error('not a valid direction');\n      }\n\n      if (this.direction === DOWN && direction !== UP) {\n        this.direction = direction;\n      } else if (this.direction === UP && direction !== DOWN) {\n        this.direction = direction;\n      } else if (this.direction === LEFT && direction !== RIGHT) {\n        this.direction = direction;\n      } else if (this.direction === RIGHT && direction !== LEFT) {\n        this.direction = direction;\n      }\n    }\n  }]);\n\n  return Snake;\n}();\n/**\n * Game class which has a snake and other game state\n */\n\n\nvar Game =\n/*#__PURE__*/\nfunction () {\n  /**\n   * Constructor function to create a new game\n   *\n   * @param  {number} w: integer number of squares wide\n   * @param  {number} h: integer number of squares high\n   * @return {void}\n   */\n  function Game(w, h) {\n    _classCallCheck(this, Game);\n\n    if (!w || !h) {\n      throw new Error(\"You're missing either height or width\");\n    }\n\n    this.width = w;\n    this.height = h;\n    this.playing = false;\n    this.snake = new Snake(w, h);\n    this.keyPressed = false;\n    this.updateGameState = this.updateGameState.bind(this);\n    this.checkCollision = this.checkCollision.bind(this);\n    this.spawnFood = this.spawnFood.bind(this);\n    this.reset = this.reset.bind(this);\n    this.startGame = this.startGame.bind(this);\n    this.endGame = this.endGame.bind(this);\n    this.spawnFood();\n    dispatchChangeGameState(this.snake, this.food);\n  }\n  /**\n   * Update this.food to be randomly placed in the game with proper x and y\n   * locations. For simplicity, don't worry about when the food spawns where\n   * the snake is.\n   *\n   * @return {void}\n   */\n\n\n  _createClass(Game, [{\n    key: \"spawnFood\",\n    value: function spawnFood() {\n      this.food = {\n        x: Math.floor(Math.random() * this.width),\n        y: Math.floor(Math.random() * this.height)\n      };\n    }\n    /**\n     * Check for collisions. There is a collision if the snake head hits one of the walls or if the\n     * snake head hits any other piece of the snake body\n     *\n     * @return {boolean} if there is a collision\n     */\n\n  }, {\n    key: \"checkCollision\",\n    value: function checkCollision() {\n      for (var i = 1; i < this.snake.body.length; i++) {\n        if (this.snake.body[i].x === this.snake.body[0].x && this.snake.body[i].y === this.snake.body[0].y) {\n          return true;\n        }\n      }\n\n      if (this.snake.body[0].x > this.width - 1 || this.snake.body[0].x < 0 || this.snake.body[0].y < 0 || this.snake.body[0].x > this.height - 1) {\n        return true;\n      }\n\n      return false;\n    }\n    /**\n     * Return if the snake is eating food right now\n     *\n     * If the snake is eating, spawn a new piece of food\n     *\n     * @return {boolean} true if snake head is on food else false\n     */\n\n  }, {\n    key: \"shouldGrow\",\n    value: function shouldGrow() {\n      return this.snake.body[0].x === this.food.x && this.snake.body[0].y === this.food.y;\n    }\n    /**\n     * Move the snake and update instance variables accordingly. Spawn new food\n     * if the snake just grew. Also, check if there is now a collision.\n     *\n     * If there is now a collision, end the game and return.\n     *\n     * Lastly, dispatch an action to change the game state.\n     *\n     * @return {void}\n     */\n\n  }, {\n    key: \"updateGameState\",\n    value: function updateGameState() {\n      if (this.shouldGrow() === true) {\n        this.snake.move(true);\n        this.spawnFood();\n      } else {\n        this.snake.move(false);\n      }\n\n      this.keyPressed = false;\n\n      if (this.checkCollision() === true) {\n        this.endGame();\n      }\n\n      dispatchChangeGameState(this.snake, this.food);\n    }\n    /**\n     * Start the game and dispatch the corresponding action on the frontend\n     *\n     * @return {void}\n     */\n\n  }, {\n    key: \"startGame\",\n    value: function startGame() {\n      this.playing = true;\n      this.gameInterval = setInterval(this.updateGameState, this.frameRate);\n      dispatchStartGame();\n    }\n    /**\n     * End the game and dispatch the corresponding action on the frontend\n     *\n     * @return {void}\n     */\n\n  }, {\n    key: \"endGame\",\n    value: function endGame() {\n      this.playing = false;\n      clearInterval(this.gameInterval);\n      dispatchEndGame();\n    }\n    /**\n     * Reset the game state such that a new game can be run only if the game is\n     * currently playing\n     *\n     * @return {void}\n     */\n\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      if (this.playing) {\n        this.playing = false;\n        this.snake = new Snake(this.width, this.height);\n        this.keyPressed = false;\n        clearInterval(this.gameInterval);\n        this.spawnFood();\n        dispatchChangeGameState(this.snake, this.food);\n      }\n    }\n  }]);\n\n  return Game;\n}(); // Create a new game\n\n\nvar game = new Game(WIDTH, HEIGHT);\n/**\n * Set up event listener for when the user presses a key\n * When the user presses 'r', restart the game\n * When the user presses ' ', start the game\n * If the user has changed their direction already once this clock tick, do\n * nothing, else check if the user pressed up, down, left, or right, and\n * change the snake direction accordingly\n *\n * @param  {Game}     game an instance of the Game class\n * @return {function}      a function which takes in an event and updates game state\n */\n\nfunction onKeyDownGenerator(game) {\n  return function (event) {\n    if (event.key === 'r') {\n      game.reset();\n      return;\n    }\n\n    if (!game.playing) {\n      // If the game has not yet started\n      if (event.key === ' ') game.startGame();\n      return;\n    }\n\n    if (game.keyPressed === false) {\n      if (event.key === 'ArrowUp') {\n        game.snake.changeDirection(UP);\n      } else if (event.key === 'ArrowDown') {\n        game.snake.changeDirection(DOWN);\n      } else if (event.key === 'ArrowLeft') {\n        game.snake.changeDirection(LEFT);\n      } else if (event.key === 'ArrowRight') {\n        game.snake.changeDirection(RIGHT);\n      }\n\n      game.keyPressed = true;\n      return;\n    }\n  };\n}\n\nvar reset = function reset() {\n  game.reset();\n};\n/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n * DONT WRITE CODE BELOW THIS LINE                                             *\n * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n\n\ntry {\n  window.onKeyDown = onKeyDownGenerator(game);\n  window.reset = reset;\n} catch (e) {\n  global.onKeyDown = onKeyDownGenerator(game);\n  global.reset = reset;\n}\n\nmodule.exports = {\n  Game: Game,\n  Snake: Snake,\n  onKeyDownGenerator: onKeyDownGenerator\n};\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ })

/******/ });