import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import s from 'styled-components'

import Container from './Container'
import Board from './Board'
import { RED } from './constants'

import Instructions from './Instructions'

const Title = s.h1`
  text-align: center;
  margin-bottom: 1rem;
`

const Links = s.div`
  padding-top: 1rem;
  text-align: center;

  a,
  p {
    margin: 0 0.5rem;
    display: inline-block;
  }
`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { justLost: false }

    this.handleLoss = this.handleLoss.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { playing } = this.props
    if (!playing && prevProps.playing) {
      this.handleLoss()
    }
  }

  handleLoss() {
    this.setState(
      {
        justLost: true,
      },
      () =>
        setTimeout(() => {
          this.setState({
            justLost: false,
          })
        }, 400)
    )
  }

  render() {
    const { justLost } = this.state

    return (
      <Container background={justLost && RED}>
        <Title>Snake</Title>

        <Board />

        <Links>
          <a role="button" onClick={() => window.reset()}>
            Reset
          </a>
        </Links>

        <Instructions />
      </Container>
    )
  }
}

const mapStateToProps = ({ playing }) => ({ playing })

App.propTypes = {
  playing: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(App)
