export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonSprites {
  front_default: string | null
  other: {
    'official-artwork': {
      front_default: string | null
    }
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: PokemonSprites
}

export interface PokemonState {
  list: Pokemon[]
  pokemonList: {
    name: string
    id: number
  }[]
  searchResult: Pokemon | null
  total: number
  page: number
  limit: number
  searchTerm: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface FetchPokemonsArgs {
  limit: number
  offset: number
}

export interface FetchPokemonsResult {
  pokemons: Pokemon[]
  count: number
}