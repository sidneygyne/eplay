//Formata preço
export const parseToBrl = (amout = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amout)
}

export const getTotalPrice = (items: Game[]) => {
  return items.reduce((accumulator, currentItem) => {
    if (currentItem.prices.current) {
      return (accumulator += currentItem.prices.current)
    }
    return 0
  }, 0)
}
