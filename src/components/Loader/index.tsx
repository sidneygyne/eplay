import { PacmanLoader } from 'react-spinners'
import { Container } from './styles'
import colors from '../../styles/colors'

export const Loader = () => (
  <Container>
    <PacmanLoader color={colors.white} />
  </Container>
)
