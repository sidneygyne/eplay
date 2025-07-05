import { Section } from '../Section'
import { Action, Item, Items, Modal, ModalContent } from './styles'
import spiderman from '../../assets/images/banner-homem-aranha.png'
import play from '../../assets/images/play.png'
import zoom from '../../assets/images/zoom.png'
import fechar from '../../assets/images/close.png'

type GalleryItem = {
  type: 'imagem' | 'video'
  url: string
}
const mock: GalleryItem[] = [
  {
    type: 'imagem',
    url: spiderman
  },
  {
    type: 'imagem',
    url: spiderman
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/LlLdzOHDfJo?si=-YzlaxgAVf1e3G_L'
  }
]

type Props = {
  defaultCover: string
  name: string
}

export const Gallery = ({ defaultCover, name }: Props) => {
  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'imagem') return item.url
    return defaultCover
  }

  const getMediaIcom = (item: GalleryItem) => {
    if (item.type === 'imagem') return zoom
    return play
  }

  return (
    <>
      <Section title="Galeria" background="black">
        <Items>
          {mock.map((media, index) => (
            <Item key={media.url}>
              <img
                src={getMediaCover(media)}
                alt={`Midia ${index + 1} de ${name}`}
              />
              <Action>
                <img
                  src={getMediaIcom(media)}
                  alt="Clique para maximizar a mídia"
                />
              </Action>
            </Item>
          ))}
        </Items>
      </Section>
      <Modal>
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img src={fechar} alt="ícone fechar" />
          </header>
          <img src={spiderman} />
        </ModalContent>
        <div className="overlay"></div>
      </Modal>
    </>
  )
}
