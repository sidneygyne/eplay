import { useEffect, useState } from 'react'
import { ProductsList } from '../../components/ProductList'
import resident from '../../assets/images/resident.png'
import { Game } from '../Home'

const promocoes: Game[] = [
  // {
  //   id: 1,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['R$ 199,90', '-10%'],
  //   image: resident
  // },
  // {
  //   id: 2,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['R$ 199,90', '-10%'],
  //   image: resident
  // },
  // {
  //   id: 3,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['R$ 199,90', '-10%'],
  //   image: resident
  // },
  // {
  //   id: 4,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['R$ 199,90', '-10%'],
  //   image: resident
  // }
]

const emBreve: Game[] = [
  // {
  //   id: 1,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['17/05'],
  //   image: resident
  // },
  // {
  //   id: 2,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['17/05'],
  //   image: resident
  // },
  // {
  //   id: 3,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['17/05'],
  //   image: resident
  // },
  // {
  //   id: 4,
  //   category: 'Ação',
  //   description:
  //     'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
  //   title: 'Resident Evil 4 - Remake',
  //   system: 'Windows',
  //   infos: ['17/05'],
  //   image: resident
  // }
]

export const Categories = () => {
  const [gamesAcao, setGamesAcao] = useState<Game[]>([])
  const [gamesEsporte, setGamesEsporte] = useState<Game[]>([])
  const [gamesSimulacao, setGamesSimulacao] = useState<Game[]>([])
  const [gamesLuta, setGamesLuta] = useState<Game[]>([])
  const [gamesRPG, setGamesRPG] = useState<Game[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/acao')
      .then((res) => res.json())
      .then((res) => setGamesAcao(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/esportes')
      .then((res) => res.json())
      .then((res) => setGamesEsporte(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/simulacao')
      .then((res) => res.json())
      .then((res) => setGamesSimulacao(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/luta')
      .then((res) => res.json())
      .then((res) => setGamesLuta(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/rpg')
      .then((res) => res.json())
      .then((res) => setGamesRPG(res))
  }, [])

  return (
    <>
      <ProductsList games={gamesRPG} title="RPG" background="black" />
      <ProductsList games={gamesAcao} title="Ação" background="gray" />
      <ProductsList
        games={gamesSimulacao}
        title="Simulacao"
        background="black"
      />
      <ProductsList games={gamesEsporte} title="Esporte" background="gray" />
      <ProductsList games={gamesLuta} title="Luta" background="black" />
    </>
  )
}
