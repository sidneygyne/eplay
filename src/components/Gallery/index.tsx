import exemplo from '../../assets/images/zelda.png'
import { Section } from '../Section'
import { Item, Items } from './styles'

export const Gallery = () => (
  <Section title="Galeria" background="black">
    <Items>
      <Item>
        <img src={exemplo} alt="imagem do link" />
      </Item>
      <Item>
        <img src={exemplo} alt="imagem do link" />
      </Item>
      <Item>
        <img src={exemplo} alt="imagem do link" />
      </Item>
      <Item>
        <img src={exemplo} alt="imagem do link" />
      </Item>
    </Items>
  </Section>
)
