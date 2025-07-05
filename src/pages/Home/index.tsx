import { Banner } from '../../components/Banner'
import { ProductsList } from '../../components/ProductList'
import { Game } from '../../models/Games'
import resident from '../../assets/images/resident.png'

const promocoes: Game[] = [
  {
    id: 1,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['R$ 199,90', '-10%'],
    image: resident
  },
  {
    id: 2,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['R$ 199,90', '-10%'],
    image: resident
  },
  {
    id: 3,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['R$ 199,90', '-10%'],
    image: resident
  },
  {
    id: 4,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['R$ 199,90', '-10%'],
    image: resident
  }
]

const emBreve: Game[] = [
  {
    id: 1,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['17/05'],
    image: resident
  },
  {
    id: 2,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['17/05'],
    image: resident
  },
  {
    id: 3,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['17/05'],
    image: resident
  },
  {
    id: 4,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror...',
    title: 'Resident Evil 4 - Remake',
    system: 'Windows',
    infos: ['17/05'],
    image: resident
  }
]

export const Home = () => (
  <>
    <Banner />
    <ProductsList games={promocoes} title="Promoções" background="gray" />
    <ProductsList games={emBreve} title="Em Breve" background="black" />
  </>
)
