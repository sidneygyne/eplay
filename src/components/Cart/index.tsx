import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'

import { Button } from '../Button'
import { Tag } from '../Tag'

import fechar from '../../assets/images/close.png'

import {
  CartContainer,
  CartItem,
  Close,
  Overlay,
  Prices,
  Quantity,
  Sidebar
} from './styles'
import { getTotalPrice, parseToBrl } from '../../utils'

export const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const goToCheckout = () => {
    navigate('/checkout')
    dispatch(close())
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar>
        <ul>
          {items.map((item) => (
            <CartItem key={item.id}>
              <img src={item.media.thumbnail} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <Tag>{item.details.category}</Tag>
                <Tag>{item.details.system}</Tag>
                <span>{parseToBrl(item.prices.current)}</span>
              </div>
              <Close
                onClick={() => removeItem(item.id)}
                type="button"
                style={{ backgroundImage: `url(${fechar})` }}
              />
            </CartItem>
          ))}
        </ul>
        <Quantity>{items.length} jogo(s) no carrinho</Quantity>
        <Prices>
          Total R$ {parseToBrl(getTotalPrice(items))}
          <span>ate 6x sem juros</span>
        </Prices>
        <Button
          onClick={goToCheckout}
          title="Clique aqui para continuar com a compra"
          type="button"
        >
          Continuar com a compra
        </Button>
      </Sidebar>
    </CartContainer>
  )
}
