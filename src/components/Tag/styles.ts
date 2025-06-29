import styled from 'styled-components'
import cores from '../../styles/cores'
import { Props } from '.'

export const TagContainer = styled.div<Props>`
  background-color: ${cores.verde};
  color: ${cores.branca};
  font-weight: bold;
  padding: ${(props) => (props.size === 'big' ? '8px 16px' : '4px 6px')};
  border-radius: 8px;
  font-size: ${(props) => (props.size === 'big' ? '16px' : '10px')};
  display: inline-block;
`
