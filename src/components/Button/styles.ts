import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../styles/colors'
import { Props } from '.'

export const ButtonContainer = styled.button<Props>`
  border: 2px solid
    ${(props) => (props.variant === 'primary' ? colors.green : colors.white)};
  background-color: ${(props) =>
    props.variant === 'primary' ? colors.green : 'transparent'};
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 8px;
  color: ${colors.white};
  cursor: pointer;
`

export const ButtonLink = styled(Link)`
  border: 2px solid ${colors.white};
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  color: ${colors.white};
`
