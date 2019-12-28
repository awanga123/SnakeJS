import React, { Component } from 'react'
import s from 'styled-components'

import { BORDER, WHITE } from './constants'

const Wrapper = s.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 1rem 1rem 0 1rem;
  background: ${WHITE};
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  p {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`

const Code = s.span`
  padding: 0.2rem 0.4rem;
  margin-right: 0.4rem;
  background: ${BORDER};
  font-family: sans-serif !important;

  ::after {
    ${({ content }) => content && `content: "${content}"`};
  }
`

const Close = s.span`
  float: right;
  opacity: 0.4;
  transform: translateY(-4px);
  cursor: hand;

  :hover {
    opacity: 0.5;
  }

  ::after {
    content: "${({ active }) => (active ? '\\2013' : '\\002B')}";
  }
`

const Content = s.div`
  transition: max-height 0.4s ease;
  overflow: hidden;
  max-height: ${({ active }) => (active ? '100vh' : 0)};
`

const Title = s.h4`
  margin-bottom: 1rem;
`

class Instructions extends Component {
  constructor(props) {
    super(props)

    this.state = { active: true }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    const { active } = this.state

    this.setState({ active: !active })
  }

  render() {
    const { active } = this.state

    return (
      <Wrapper>
        <Close onClick={this.toggle} active={active} />

        <Title>Instructions</Title>

        <Content active={active}>
          <p>
            <Code>space</Code>
            start game
          </p>

          <p>
            <Code>r</Code>
            reset game
          </p>

          <p>
            <Code content={'\\2190'} />
            face left
          </p>

          <p>
            <Code content={'\\2192'} />
            face right
          </p>

          <p>
            <Code content={'\\2191'} />
            face up
          </p>

          <p>
            <Code content={'\\2193'} />
            face down
          </p>
        </Content>
      </Wrapper>
    )
  }
}

export default Instructions
