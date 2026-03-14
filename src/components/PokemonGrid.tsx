import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { fetchPokemons } from '../features/pokemon/pokemonSlice'
import {
  selectPokemonList,
  selectSearchResult,
  selectStatus,
  selectError,
  selectPage,
  selectLimit,
} from '../features/pokemon/pokemonSelectors'
import PokemonCard from './PokemonCard'

const PokemonGrid = () => {
  const dispatch = useAppDispatch()
  const list         = useAppSelector(selectPokemonList)
  const searchResult = useAppSelector(selectSearchResult)
  const status       = useAppSelector(selectStatus)
  const error        = useAppSelector(selectError)
  const page         = useAppSelector(selectPage)
  const limit        = useAppSelector(selectLimit)

  useEffect(() => {
    if (!searchResult) {
      dispatch(fetchPokemons({ limit, offset: (page - 1) * limit }))
    }
  }, [page, searchResult, dispatch, limit])

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-2xl bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 bg-size-[200%_100%] animate-[shimmer_1.4s_infinite]"
          />
        ))}
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-base">{error ?? 'Algo salió mal.'}</p>
      </div>
    )
  }

  const displayList = searchResult ? [searchResult] : list
  if (displayList.length === 0) return null

  return (
    <div className="mt-8 flex justify-center">
      <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-2 lg:grid-cols-3">
        {displayList.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  )
}

export default PokemonGrid