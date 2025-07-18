import { Container, Title } from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  children: JSX.Element
}

export const Section = ({ title, background, children }: Props) => (
  <Container background={background}>
    <div className="container">
      <Title>{title}</Title>
      {children}
    </div>
  </Container>
)
