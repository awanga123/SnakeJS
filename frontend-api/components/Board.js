import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import s from 'styled-components'

import Square from './Square'
import { SQUARE_SIZE, BORDER } from './constants'

const Wrapper = s.div`
  text-align: center;
  margin: 0 auto;
  width: ${({ numCols }) => `calc(${numCols * SQUARE_SIZE}rem + 4px)`}
`

const Row = s.div`
  width: auto;
  display: inline-block;
  margin: 0 auto;
  border-left: 2px solid ${BORDER};
  border-right: 2px solid ${BORDER};

  :first-child {
    border-top: 2px solid ${BORDER};
  }

  :last-child {
    border-bottom: 2px solid ${BORDER};
  }
`

const Board = ({ board }) => {
  const numCols = board[0].length

  return (
    <Wrapper numCols={numCols}>
      {board.map((row, rowIdx) => (
        <Row key={`row-${rowIdx}`}>
          {row.map((col, colIdx) => (
            <Square
              isSnake={col === 1}
              isFood={col === 2}
              key={`row-${rowIdx}-col-${colIdx}-${col}`}
            />
          ))}
        </Row>
      ))}
    </Wrapper>
  )
}

const mapStateToProps = state => {
  const { gameState } = state
  return {
    board: gameState,
  }
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
}

export default connect(mapStateToProps)(Board)
