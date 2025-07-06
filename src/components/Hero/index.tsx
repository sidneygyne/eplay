import bannerImg from '../../assets/images/hero_hogwarts.png'
import { Game } from '../../pages/Home'
import { Button } from '../Button'
import { formataPreco } from '../ProductList'

import { Tag } from '../Tag'
import { Banner, Infos } from './styles'

type Props = {
  game: Game
}

export const Hero = ({ game }: Props) => (
  <Banner style={{ backgroundImage: `url(${game.media.cover})` }}>
    <div className="container">
      <div>
        <Tag>{game.details.category}</Tag>
        <Tag>{game.details.system}</Tag>
      </div>

      <Infos>
        <h2>{game.name}</h2>
        <p>
          {game.prices.discount && (
            <span>De {formataPreco(game.prices.old)}</span>
          )}
          {game.prices.discount && <>Por {formataPreco(game.prices.current)}</>}
        </p>

        {game.prices.discount && (
          <Button
            type="button"
            title="Clique aqui para adicionar este jogo ao carrinho"
          >
            Adicionar ao carrinho
          </Button>
        )}
      </Infos>
    </div>
  </Banner>
)
