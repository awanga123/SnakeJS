/* global window */

let store
try {
  store = window.store
} catch (e) {
  store = global.store
}

const { WIDTH, HEIGHT } = require('./constants')
const { END_GAME, CHANGE_GAME_STATE, START_GAME } = require('./actionTypes')

// Constants used for differentiating body and food -- 0 is used for empty space
const SNAKE_BODY_ELEMENT = 1
const FOOD_ELEMENT = 2

/**
 * Create a new blank grid of the specified proper size
 * NOTE that the grid is organized [row][col] or [y][x]
 *
 * @return {[[number]]} blank grid
 */
function createBlank2dGrid() {
  const blankState = []

  for (let i = 0; i < HEIGHT; i += 1) {
    const row = []

    for (let j = 0; j < WIDTH; j += 1) {
      row.push(0)
    }

    blankState.push(row)
  }

  return blankState
}

/**
 * Update the game state to reflect the position of the snake and food
 *
 * @param {Snake}                    snake
 * @param {{ x: number, y: number }} food
 * @return void
 */
function dispatchChangeGameState(snake, food) {
  if (!snake) {
    throw new Error('snake is undefined')
  } else if (!snake.body) {
    throw new Error('snake is defined does not have a body')
  }

  const newGameState = createBlank2dGrid()

  snake.body.forEach(({ x, y }) => {
    newGameState[y][x] = SNAKE_BODY_ELEMENT
  })

  if (food) {
    newGameState[food.y][food.x] = FOOD_ELEMENT
  }

  store.dispatch({
    type: CHANGE_GAME_STATE,
    newGameState,
  })
}

/**
 * Dispatch a function to the frontend to signify the game has ended
 *
 * @return {void}
 */
function dispatchEndGame() {
  return store.dispatch({
    type: END_GAME,
  })
}

/**
 * Dispatch a function to the frontend to signify the game has started
 *
 * @return {void}
 */
function dispatchStartGame() {
  return store.dispatch({
    type: START_GAME,
  })
}

module.exports = {
  dispatchChangeGameState,
  dispatchStartGame,
  dispatchEndGame,
}
