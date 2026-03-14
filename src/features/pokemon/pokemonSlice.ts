import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type {
  Pokemon,
  PokemonState,
  FetchPokemonsArgs,
  FetchPokemonsResult,
} from '../../types/pokemon'


export const fetchPokemons = createAsyncThunk<
  FetchPokemonsResult,
  FetchPokemonsArgs
>(
  'pokemon/fetchAll',
  async ({ limit, offset }) => {

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )

    if (!res.ok) {
      throw new Error('Error al obtener la lista de pokémon')
    }

    const data: { results: { url: string }[]; count: number } =
      await res.json()

    const pokemons: Pokemon[] = await Promise.all(
      data.results.map((p) =>
        fetch(p.url).then((r) => r.json())
      )
    )

    return { pokemons, count: data.count }

  }
)

export const searchPokemon = createAsyncThunk<
  Pokemon,
  string
>(
  'pokemon/search',
  async (query, { rejectWithValue }) => {

    try {

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query
          .toLowerCase()
          .trim()}`
      )

      if (!res.ok) {
        throw new Error(`No se encontró "${query}"`)
      }

      return (await res.json()) as Pokemon

    } catch (err) {

      return rejectWithValue(
        (err as Error).message
      )

    }

  }
)

//For the autocomplete dropdown
export const fetchPokemonList = createAsyncThunk(
  'pokemon/list',
  async () => {

    const res = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=1300'
    )

    if (!res.ok) {
      throw new Error('Error al obtener la lista')
    }

    const data = await res.json()

    return data.results.map(
      (p: any, index: number) => ({
        name: p.name,
        id: index + 1
      })
    )

  }
)

const initialState: PokemonState = {

  list: [],

  pokemonList: [],

  searchResult: null,

  total: 0,

  page: 1,

  limit: 6,

  searchTerm: '',

  status: 'idle',

  error: null,

}

const pokemonSlice = createSlice({

  name: 'pokemon',

  initialState,

  reducers: {

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },

    setSearchTerm(state, action: PayloadAction<string>) {

      state.searchTerm = action.payload

      if (!action.payload) {
        state.searchResult = null
        state.error = null
      }

    },

    clearSearch(state) {

      state.searchTerm = ''
      state.searchResult = null
      state.error = null

    },

  },

  extraReducers: (builder) => {

    builder
      .addCase(fetchPokemons.pending, (state) => {

        state.status = 'loading'
        state.error = null

      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {

        state.status = 'succeeded'

        state.list = action.payload.pokemons

        state.total = action.payload.count

      })

      .addCase(fetchPokemons.rejected, (state, action) => {

        state.status = 'failed'

        state.error =
          action.error.message ?? 'Error desconocido'

      })
      .addCase(searchPokemon.pending, (state) => {

        state.status = 'loading'
        state.error = null

      })
      .addCase(searchPokemon.fulfilled, (state, action) => {

        state.status = 'succeeded'

        state.searchResult = action.payload

      })
      .addCase(searchPokemon.rejected, (state, action) => {

        state.status = 'failed'

        state.error =
          (action.payload as string) ?? 'No encontrado'

        state.searchResult = null

      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {

        state.pokemonList = action.payload

      })

  },

})

export const {
  setPage,
  setSearchTerm,
  clearSearch
} = pokemonSlice.actions

export default pokemonSlice.reducer