import React, { useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { setSearchTerm, searchPokemon } from '../features/pokemon/pokemonSlice'
import { selectSearchTerm } from '../features/pokemon/pokemonSelectors'
import { filterPokemon } from '../utils/pokemonSearch'
import AutocompleteItem from './AutocompleteItem'

const SearchBar = () => {
  const dispatch = useAppDispatch()

  const searchTerm = useAppSelector(selectSearchTerm)
  const pokemonList = useAppSelector((s) => s.pokemon.pokemonList)

  const [activeIndex, setActiveIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  const suggestions = useMemo(
    () => filterPokemon(pokemonList, searchTerm),
    [pokemonList, searchTerm]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    dispatch(setSearchTerm(value))
    setActiveIndex(-1)

    if (value) {
      setIsOpen(true)
    }
  }

  const selectPokemon = (name: string) => {
    dispatch(setSearchTerm(name))
    dispatch(searchPokemon(name))

    setIsOpen(false)
  }

  const handleFocus = () => {
    if (searchTerm) {
      setIsOpen(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((i) =>
        Math.min(i + 1, suggestions.length - 1)
      )
    }

    if (e.key === 'ArrowUp') {
      setActiveIndex((i) =>
        Math.max(i - 1, 0)
      )
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      selectPokemon(suggestions[activeIndex].name)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">

      <input
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Buscar Pokémon..."
        className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 focus:border-blue-500 outline-none"
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white mt-2 rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
          {suggestions.map((p, i) => (
            <AutocompleteItem
              key={p.id}
              pokemon={p}
              active={i === activeIndex}
              onClick={() => selectPokemon(p.name)}
            />
          ))}
        </ul>
      )}

    </div>
  )
}

export default SearchBar