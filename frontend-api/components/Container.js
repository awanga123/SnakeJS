import s from 'styled-components'
import { WHITE } from './constants'

export default s.div`
  padding: 1rem calc(1rem + 5%);
  transition: 0.2s background ease;
  min-height: 100vh;
  background: ${({ background }) => background || WHITE};
`
