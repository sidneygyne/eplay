import { Button } from '../Button'
import { Tag } from '../Tag'
import {
  CartContainer,
  CartItem,
  Close,
  Overlay,
  Prices,
  Quantity,
  Sidebar
} from './styles'
import starWars from '../../assets/images/star_wars.png'
import fechar from '../../assets/images/close.png'

export const Cart = () => (
  <CartContainer>
    <Overlay></Overlay>
    <Sidebar>
      <ul>
        <CartItem>
          <img src={starWars} />
          <div>
            <h3>Nome do jogo</h3>
            <Tag>rpg</Tag>
            <Tag>PS5</Tag>
            <span> R$ 150,00</span>
          </div>
          <Close type="button" style={{ backgroundImage: `url(${fechar})` }} />
        </CartItem>

        <CartItem>
          <img src={starWars} />
          <div>
            <h3>Nome do jogo</h3>
            <Tag>rpg</Tag>
            <Tag>PS5</Tag>
            <span> R$ 150,00</span>
          </div>
          <Close type="button" style={{ backgroundImage: `url(${fechar})` }} />
        </CartItem>
      </ul>
      <Quantity>2 jogos</Quantity>
      <Prices>
        Total R$<span>ate 6x sem juros</span>
      </Prices>
      <Button title="Clique aqui para continuar com a compra" type="button">
        Continuar com a compra
      </Button>
    </Sidebar>
  </CartContainer>
)
