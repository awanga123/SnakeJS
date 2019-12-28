/* global window */
const { createStore } = require('redux')
const { width, height } = require('./constants')
const { END_GAME, START_GAME, CHANGE_GAME_STATE } = require('./actionTypes')

const defaultGameState = Array(height).fill(Array(width).fill(0))

function reducer(
  state = { gameState: defaultGameState, playing: false },
  action
) {
  const stateCopy = Object.assign({}, state)

  switch (action.type) {
    case CHANGE_GAME_STATE:
      stateCopy.gameState = action.newGameState
      break

    case END_GAME:
      stateCopy.playing = false
      break

    case START_GAME:
      stateCopy.playing = true
      break

    default:
      return stateCopy
  }

  return stateCopy
}

try {
  window.store = createStore(reducer)
} catch (e) {
  global.store = createStore(reducer)
}
