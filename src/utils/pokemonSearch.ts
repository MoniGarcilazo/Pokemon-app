export interface PokemonOption {
  name: string
  id: number
}

export const filterPokemon = (
  list: PokemonOption[],
  query: string
): PokemonOption[] => {

  const q = query.toLowerCase()

  if (!q) return []

  const isNumber = !isNaN(Number(q))

  const results = list.filter((p) => {
    if (isNumber) return p.id === Number(q)
    return p.name.includes(q)
  })

  return results.slice(0, 8)
}