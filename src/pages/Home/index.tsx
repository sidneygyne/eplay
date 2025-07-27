import { Banner } from '../../components/Banner'
import { ProductsList } from '../../components/ProductList'
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

  const { data: onSaleGames, isLoading: isLoadingSale } = useGetOnSaleQuery()
  const { data: soonGames, isLoading: isLoadingSoon } = useGetSoonQuery()

  return (
    <>
      <Banner />
      <ProductsList
        games={onSaleGames}
        title="Promoções"
        background="gray"
        id="on-sale"
        isLoading={isLoadingSale}
      />
      <ProductsList
        games={soonGames}
        title="Em Breve"
        background="black"
        id="coming-soon"
        isLoading={isLoadingSoon}
      />
    </>
  )
}
