import { ProductsList } from '../../components/ProductList'

import {
  useGetActionGamesQuery,
  useGetFigthGamesQuery,
  useGetRpgGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportsGamesQuery
} from '../../services/api'

export const Categories = () => {
  const { data: actionGames } = useGetActionGamesQuery()
  const { data: figthGames } = useGetFigthGamesQuery()
  const { data: rpgGames } = useGetRpgGamesQuery()
  const { data: simulationGames } = useGetSimulationGamesQuery()
  const { data: sportsGames } = useGetSportsGamesQuery()

  if (actionGames && figthGames && rpgGames && simulationGames && sportsGames) {
    return (
      <>
        <ProductsList
          games={rpgGames}
          title="RPG"
          background="black"
          id="rpg"
        />
        <ProductsList
          games={actionGames}
          title="Ação"
          background="gray"
          id="action"
        />
        <ProductsList
          games={simulationGames}
          title="Simulacao"
          background="black"
          id="simulation"
        />
        <ProductsList
          games={sportsGames}
          title="Esporte"
          background="gray"
          id="sports"
        />
        <ProductsList
          games={figthGames}
          title="Luta"
          background="black"
          id="figth"
        />
      </>
    )
  }
  return <h4>Carregando...</h4>
}
