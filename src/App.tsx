import { useEffect } from 'react'
import { useAppDispatch } from './hooks/reduxHooks'

import Header from './components/Header'
import PokemonGrid from './components/PokemonGrid'
import Pagination from './components/Pagination'

import { fetchPokemonList } from './features/pokemon/pokemonSlice'

const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPokemonList())
  }, [dispatch])

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-3 mt-6">
          <PokemonGrid />
        </div>
      </main>

      <footer className="flex justify-center">
        <div className="w-full max-w-6xl pb-3">
          <Pagination />
        </div>
      </footer>
    </div>
  )
}

export default App