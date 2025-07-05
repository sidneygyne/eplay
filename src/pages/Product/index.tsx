import { useParams } from 'react-router-dom'

export const Product = () => {
  const { id } = useParams()

  return <h1>Produto {id}</h1>
}
