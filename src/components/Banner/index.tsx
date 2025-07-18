import { useEffect, useState } from 'react'
import { Imagem, Titulo, Preco } from './styles'
import { Tag } from '../Tag'
import { Button } from '../Button'
import { Game } from '../../pages/Home'
import { formataPreco } from '../ProductList'
import { useGetFeaturedGameQuery } from '../../services/api'

export const Banner = () => {
  const { data: game, isLoading } = useGetFeaturedGameQuery()

  // const [game, setGame] = useState<Game>()
  // useEffect(() => {
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/destaque')
  //     .then((res) => res.json())
  //     .then((res) => setGame(res))
  // }, [])

  if (!game) {
    return <h3>Carregando...</h3>
  }

  return (
    <Imagem style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do dia</Tag>
        <div>
          <Titulo>{game.name}</Titulo>
          <Preco>
            De <span>{formataPreco(game.prices.old)}</span> <br />
            por apenas {formataPreco(game.prices.current)}
          </Preco>
        </div>

        <Button
          type="link"
          to={`/product/${game.id}`}
          title="Clique aqui para aproveitar está oferra"
        >
          Aproveitar
        </Button>
      </div>
    </Imagem>
  )
}
