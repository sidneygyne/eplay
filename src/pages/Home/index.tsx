import { useEffect, useState } from 'react'
import { Banner } from '../../components/Banner'
import { ProductsList } from '../../components/ProductList'
import resident from '../../assets/images/resident.png'
import { useGetOnSaleQuery, useGetSoonQuery } from '../../services/api'

// const promocoes: Game[] = [
//   {
//     id: 1,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['R$ 199,90', '-10%'],
//     image: resident
//   },
//   {
//     id: 2,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['R$ 199,90', '-10%'],
//     image: resident
//   },
//   {
//     id: 3,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['R$ 199,90', '-10%'],
//     image: resident
//   },
//   {
//     id: 4,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['R$ 199,90', '-10%'],
//     image: resident
//   }
// ]

// const emBreve: Game[] = [
//   {
//     id: 1,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['17/05'],
//     image: resident
//   },
//   {
//     id: 2,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['17/05'],
//     image: resident
//   },
//   {
//     id: 3,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['17/05'],
//     image: resident
//   },
//   {
//     id: 4,
//     category: 'Ação',
//     description:
//       'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
//     title: 'Resident Evil 4 - Remake',
//     system: 'Windows',
//     infos: ['17/05'],
//     image: resident
//   }
// ]

export interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

export type Game = {
  id: number
  name: string
  description: string
  release_date?: string
  prices: {
    discount?: number
    old?: number
    current?: number
  }
  details: {
    category: string
    system: string
    developer: string
    publisher: string
    languages: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  }
}

export const Home = () => {
  // const [promocoes, setPromocoes] = useState<Game[]>([])
  // const [emBreve, setEmBreve] = useState<Game[]>([])
  // useEffect(() => {
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/promocoes')
  //     .then((res) => res.json())
  //     .then((res) => setPromocoes(res))
  //   fetch('https://fake-api-tau.vercel.app/api/eplay/em-breve')
  //     .then((res) => res.json())
  //     .then((res) => setEmBreve(res))
  // }, [])

  const { data: onSaleGames } = useGetOnSaleQuery()
  const { data: soonGames } = useGetSoonQuery()

  if (onSaleGames && soonGames) {
    return (
      <>
        <Banner />
        <ProductsList
          games={onSaleGames}
          title="Promoções"
          background="gray"
          id="on-sale"
        />
        <ProductsList
          games={soonGames}
          title="Em Breve"
          background="black"
          id="coming-soon"
        />
      </>
    )
  }

  return <h4>Carregando...</h4>
}
