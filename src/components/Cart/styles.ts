import styled from 'styled-components'
import colors from '../../styles/colors'
import { ButtonContainer } from '../Button/styles'
import { TagContainer } from '../Tag/styles'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.black};
  opacity: 0.7;
`
export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  z-index: 1;

  &.is-open {
    display: flex;
  }
`
export const Sidebar = styled.aside`
  background: ${colors.gray};
  z-index: 1;
  padding: 40px 16px 0 16px;
  max-width: 360px;
  width: 100%;

  ${ButtonContainer} {
    max-width: 100%;
    width: 100%;-
  }

  .empty-text {
    font-size: 14px;
    line-height: 22px;
    color: ${colors.white};
    text-align: center;
  }
`
export const Prices = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.white};
  margin-bottom: 24px;

  span {
    display: block;
    font-size: 12px;
    color: ${colors.lightGray};
  }
`

export const Quantity = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.white};
  margin: 32px 0 16px 0;
`
export const CartItem = styled.li`
  position: relative;
  display: flex;
  border-bottom: 1px solid ${colors.lightGray};
  padding: 8px 0;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 24px;
  }

  h3 {
    color: ${colors.white}
    font-weight: bold;
    font-size: 16px;
  }

  span {
    display: block;
        color: ${colors.white}
    font-weight: bold;
    font-size: 16px;
  }

  ${TagContainer} {
    margin: 8px 8px 16px 0px;
  }


`

export const Close = styled.button`
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  position: absolute;
  top: 8;
  right: 0;
`
