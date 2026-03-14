import { useState } from 'react'
import type { Pokemon } from '../types/pokemon'
import { getTypeColor, capitalize, formatId } from '../utils/pokemonUtils'
import PokemonModal from './PokemonModal'

interface Props {
  pokemon: Pokemon
}

const PokemonCard = ({ pokemon }: Props) => {
  const [open, setOpen] = useState(false)

  const image =
    pokemon.sprites.other['official-artwork'].front_default ??
    pokemon.sprites.front_default ??
    ''

  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const { bg } = getTypeColor(primaryType)

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 transform overflow-hidden"
      >
        <div
          className="flex items-center justify-center p-8 min-h-42"
          style={{ backgroundColor: bg }}
        >
          <img
            src={image}
            alt={pokemon.name}
            className="w-28 h-28 object-contain"
          />
        </div>

        <div className="px-4 py-4 text-center space-y-1">
          <span className="text-xs font-mono text-slate-400">
            {formatId(pokemon.id)}
          </span>
          <h2 className="text-lg font-bold text-slate-800">
            {capitalize(pokemon.name)}
          </h2>
        </div>
      </article>

      {open && (
        <PokemonModal
          pokemon={pokemon}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default PokemonCard