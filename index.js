/* global window */

const {
  dispatchChangeGameState,
  dispatchStartGame,
  dispatchEndGame,
} = require('./frontend-api/api')

const {
  WIDTH,
  HEIGHT,
  FRAME_RATE,
  directions: { UP, DOWN, LEFT, RIGHT },
} = require('./frontend-api/constants')

/**
 * Note that we are using destructuring for our imports so that you can access
 * UP, DOWN, LEFT, and RIGHT directly as variables in your code below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * The same goes for the WIDTH, HEIGHT, and FRAME_RATE variables which you will
 * take advantage of in your implementation below.
 *
 * Depending on your code editor, if you hover on these variables it will tell
 * you what type they are, though that shouldn't really matter for your
 * purposes. You can also open up the constants file to see what's going on
 * under the hood.
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Don't worry about anything above this line :D                               *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * The snake is an array of body pieces which are located on the Game
 * each Game has one Snake
 */
class Snake {
  /**
   * Create a new snake
   *
   * Initializes the body to be at the center of the game board
   * Initializes this.body to be 5 items long vertically
   * Initializes this.direction
   * Binds move and changeDirection class methods to the Snake class
   *
   * @param  {number} w the number of columns in the board
   * @param  {number} h the number of rows in the board
   * @return {void}
   */
  constructor(w, h) {
    if (!w || !h) {
      throw new Error("You're missing either height or width for Snake")
    }
    //get the starting x and y coordinates
    const xs = Math.floor(w / 2)
    const ys = Math.floor(h / 2)

    //intialize body
    this.body = [
      {x: xs, y: ys},
      {x: xs, y: ys + 1},
      {x: xs, y: ys + 2},
      {x: xs, y: ys + 3},
      {x: xs, y: ys + 4},
    ]

    //initiliaze direction
    this.direction = UP

    //bind functions
    this.move = this.move.bind(this)
    this.changeDirection = this.changeDirection.bind(this)

  }

  /**
   * Move the snake forwards in the proper direction
   *
   * @param  {boolean} grow if the snake just ate food and thus should be
   *                        elongated by one square
   * @return {void}
   */
  move(grow) {
    if (this.direction === UP) {
      this.body.unshift({x: this.body[0].x, y: this.body[0].y - 1})
    } else if (this.direction === DOWN) {
      this.body.unshift({x: this.body[0].x, y: this.body[0].y + 1})
    } else if (this.direction === LEFT) {
      this.body.unshift({x: this.body[0].x - 1, y: this.body[0].y})
    } else if (this.direction === RIGHT) {
      this.body.unshift({x: this.body[0].x + 1, y: this.body[0].y})
    }

    if (!grow) {
      this.body.pop()
    }
  }

  /**
   * Change the direction of the snake
   *
   * If the passed in direction is not UP, DOWN, LEFT, or RIGHT (constants
   * which are defined above), throw an error.
   *
   * If the snake is moving in a certain direction and the user asks to move in
   * the opposite direction, do not update the direction. That is to say, the
   * snake can only make 90 degree turns.
   *
   * @throws                    error if invalid direction provided
   * @param  {string} direction either UP, DOWN, LEFT, or RIGHT
   * @return {void}
   */
  changeDirection(direction) {
    const directions = [UP, DOWN, LEFT, RIGHT]

    // throws error if no direction provided
    if (!directions.includes(direction)) {
      throw new Error ('not a valid direction')
    }

    if (this.direction === DOWN && direction !== UP) {
      this.direction = direction
    } else if (this.direction === UP && direction !== DOWN) {
      this.direction = direction
    } else if (this.direction === LEFT && direction !== RIGHT) {
      this.direction = direction
    } else if (this.direction === RIGHT && direction !== LEFT) {
      this.direction = direction
    }
  }
}

/**
 * Game class which has a snake and other game state
 */
class Game {
  /**
   * Constructor function to create a new game
   *
   * @param  {number} w: integer number of squares wide
   * @param  {number} h: integer number of squares high
   * @return {void}
   */
  constructor(w, h) {
    if (!w || !h) {
      throw new Error("You're missing either height or width")
    }

    this.width = w
    this.height = h
    this.playing = false
    this.snake = new Snake(w, h)
    this.keyPressed = false

    this.updateGameState = this.updateGameState.bind(this)
    this.checkCollision = this.checkCollision.bind(this)
    this.spawnFood = this.spawnFood.bind(this)
    this.reset = this.reset.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
    this.spawnFood()
    dispatchChangeGameState(this.snake, this.food)
  }

  /**
   * Update this.food to be randomly placed in the game with proper x and y
   * locations. For simplicity, don't worry about when the food spawns where
   * the snake is.
   *
   * @return {void}
   */
  spawnFood() {
    this.food = {x: Math.floor(Math.random() * this.width), y: Math.floor(Math.random() * this.height)}
  }

  /**
   * Check for collisions. There is a collision if the snake head hits one of the walls or if the
   * snake head hits any other piece of the snake body
   *
   * @return {boolean} if there is a collision
   */
  checkCollision() {
    for ( let i = 1; i < this.snake.body.length; i++) {
      if (this.snake.body[i].x === this.snake.body[0].x && this.snake.body[i].y === this.snake.body[0].y) {
        return true
      }
    }
    if (this.snake.body[0].x > this.width - 1 || this.snake.body[0].x < 0 || this.snake.body[0].y < 0
     || this.snake.body[0].y > this.height - 1) {
      return true
    }
    return false
  }

  /**
   * Return if the snake is eating food right now
   *
   * If the snake is eating, spawn a new piece of food
   *
   * @return {boolean} true if snake head is on food else false
   */
  shouldGrow() {
    return this.snake.body[0].x === this.food.x && this.snake.body[0].y === this.food.y
  }

  /**
   * Move the snake and update instance variables accordingly. Spawn new food
   * if the snake just grew. Also, check if there is now a collision.
   *
   * If there is now a collision, end the game and return.
   *
   * Lastly, dispatch an action to change the game state.
   *
   * @return {void}
   */
  updateGameState() {
    if (this.shouldGrow() === true) {
      this.snake.move(true)
      this.spawnFood()
    } else {
      this.snake.move(false)
    }
    this.keyPressed = false
    if (this.checkCollision() === true) {
      this.endGame()
    }
    dispatchChangeGameState(this.snake, this.food)
  }

  /**
   * Start the game and dispatch the corresponding action on the frontend
   *
   * @return {void}
   */
  startGame() {
    this.playing = true
    this.gameInterval = setInterval(this.updateGameState, this.frameRate)
    dispatchStartGame()
  }

  /**
   * End the game and dispatch the corresponding action on the frontend
   *
   * @return {void}
   */
  endGame() {
    this.playing = false
    clearInterval(this.gameInterval)
    dispatchEndGame()

  }

  /**
   * Reset the game state such that a new game can be run only if the game is
   * currently playing
   *
   * @return {void}
   */
  reset() {
    if (this.playing) {
      this.playing = false
      this.snake = new Snake(this.width, this.height)
      this.keyPressed = false
      clearInterval(this.gameInterval)
      this.spawnFood()
      dispatchChangeGameState(this.snake, this.food)
    }
  }
}

// Create a new game
const game = new Game(WIDTH, HEIGHT)

/**
 * Set up event listener for when the user presses a key
 * When the user presses 'r', restart the game
 * When the user presses ' ', start the game
 * If the user has changed their direction already once this clock tick, do
 * nothing, else check if the user pressed up, down, left, or right, and
 * change the snake direction accordingly
 *
 * @param  {Game}     game an instance of the Game class
 * @return {function}      a function which takes in an event and updates game state
 */
function onKeyDownGenerator(game) {
  return function(event) {
    if (event.key === 'r') {
      game.reset()
      return
    }

    if (!game.playing) {
      // If the game has not yet started
      if (event.key === ' ') game.startGame()
      return
    }
    if (game.keyPressed === false) {
      if (event.key === 'ArrowUp') {
        game.snake.changeDirection(UP)
      } else if (event.key === 'ArrowDown') {
        game.snake.changeDirection(DOWN)
      } else if (event.key === 'ArrowLeft') {
        game.snake.changeDirection(LEFT)
      } else if (event.key === 'ArrowRight') {
        game.snake.changeDirection(RIGHT)
      }
      game.keyPressed = true
      return
    }
  }
}

const reset = function reset() {
  game.reset()
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DONT WRITE CODE BELOW THIS LINE                                             *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

try {
  window.onKeyDown = onKeyDownGenerator(game)
  window.reset = reset
} catch (e) {
  global.onKeyDown = onKeyDownGenerator(game)
  global.reset = reset
}

module.exports = {
  Game,
  Snake,
  onKeyDownGenerator,
}
