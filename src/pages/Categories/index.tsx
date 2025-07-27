import { ProductsList } from '../../components/ProductList'

import {
  useGetActionGamesQuery,
  useGetFigthGamesQuery,
  useGetRpgGamesQuery,
  useGetSimulationGamesQuery,
  useGetSportsGamesQuery
} from '../../services/api'

export const Categories = () => {
  const { data: actionGames, isLoading: isLoadingAction } =
    useGetActionGamesQuery()
  const { data: figthGames, isLoading: isLoadingFigth } =
    useGetFigthGamesQuery()
  const { data: rpgGames, isLoading: isLoadingRpg } = useGetRpgGamesQuery()
  const { data: simulationGames, isLoading: isLoadingSimulation } =
    useGetSimulationGamesQuery()
  const { data: sportsGames, isLoading: isLoadingSports } =
    useGetSportsGamesQuery()

  return (
    <>
      <ProductsList
        games={rpgGames}
        title="RPG"
        background="black"
        id="rpg"
        isLoading={isLoadingRpg}
      />
      <ProductsList
        games={actionGames}
        title="Ação"
        background="gray"
        id="action"
        isLoading={isLoadingAction}
      />
      <ProductsList
        games={simulationGames}
        title="Simulacao"
        background="black"
        id="simulation"
        isLoading={isLoadingSimulation}
      />
      <ProductsList
        games={sportsGames}
        title="Esporte"
        background="gray"
        id="sports"
        isLoading={isLoadingSports}
      />
      <ProductsList
        games={figthGames}
        title="Luta"
        background="black"
        id="figth"
        isLoading={isLoadingFigth}
      />
    </>
  )
}
