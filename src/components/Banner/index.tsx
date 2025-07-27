import { useGetFeaturedGameQuery } from '../../services/api'
import { Loader } from '../Loader'
import { Tag } from '../Tag'
import { Button } from '../Button'

import { parseToBrl } from '../../utils'
import { Image, Title, Prices } from './styles'

export const Banner = () => {
  const { data: game } = useGetFeaturedGameQuery()

  // const [game, setGame] = useState<Game>()
  // useEffect(() => {
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/destaque')
  //     .then((res) => res.json())
  //     .then((res) => setGame(res))
  // }, [])

  if (!game) {
    return <Loader />
  }

  return (
    <Image style={{ backgroundImage: `url(${game.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do dia</Tag>
        <div>
          <Title>{game.name}</Title>
          <Prices>
            De <span>{parseToBrl(game.prices.old)}</span> <br />
            por apenas {parseToBrl(game.prices.current)}
          </Prices>
        </div>

        <Button
          type="link"
          to={`/product/${game.id}`}
          title="Clique aqui para aproveitar está oferra"
        >
          Aproveitar
        </Button>
      </div>
    </Image>
  )
}
