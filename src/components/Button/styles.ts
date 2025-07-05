import { Link } from 'react-router-dom'
import styled from 'styled-components'
import cores from '../../styles/cores'
import { Props } from '.'

export const ButtonContainer = styled.button<Props>`
  border: 2px solid
    ${(props) => (props.variant === 'primary' ? cores.verde : cores.branca)};
  background-color: ${(props) =>
    props.variant === 'primary' ? cores.verde : 'transparent'};
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  color: ${cores.branca};
`

export const ButtonLink = styled(Link)`
  border: 2px solid ${cores.branca};
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  color: ${cores.branca};
`
