import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'

import {
  BORDER,
  SQUARE_SIZE,
  RED,
  LIGHT_RED,
  BLUE,
  LIGHT_BLUE,
} from './constants'

const SquareWrapper = s.div`
  width: ${SQUARE_SIZE}rem;
  height: ${SQUARE_SIZE}rem;
  display: inline-block;
  border: 2px solid ${BORDER};
  box-sizing: border-box;

  ${({ isSnake }) =>
    isSnake &&
    `
    background: ${LIGHT_BLUE};
    border: 2px solid ${BLUE};
  `}

  ${({ isFood }) =>
    isFood &&
    `
    background: ${LIGHT_RED};
    border: 2px solid ${RED};
  `}
`

const Square = ({ isSnake, isFood }) => (
  <SquareWrapper isSnake={isSnake} isFood={isFood} />
)

Square.propTypes = {
  isSnake: PropTypes.bool.isRequired,
  isFood: PropTypes.bool.isRequired,
}

export default Square
