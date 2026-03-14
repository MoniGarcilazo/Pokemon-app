import type { RootState } from '../../app/store'

export const selectPokemonList    = (state: RootState) => state.pokemon.list
export const selectSearchResult   = (state: RootState) => state.pokemon.searchResult
export const selectStatus         = (state: RootState) => state.pokemon.status
export const selectError          = (state: RootState) => state.pokemon.error
export const selectPage           = (state: RootState) => state.pokemon.page
export const selectLimit          = (state: RootState) => state.pokemon.limit
export const selectTotal          = (state: RootState) => state.pokemon.total
export const selectSearchTerm     = (state: RootState) => state.pokemon.searchTerm
export const selectTotalPages     = (state: RootState) =>
  Math.ceil(state.pokemon.total / state.pokemon.limit)