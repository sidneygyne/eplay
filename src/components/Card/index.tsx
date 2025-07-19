import { Container } from './styled'

type Props = {
  children: JSX.Element
  title: string
}

export const Card = ({ children, title }: Props) => (
  <Container>
    <h2>{title}</h2>
    {children}
  </Container>
)
