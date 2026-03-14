import { capitalize, formatId } from '../utils/pokemonUtils'
import type { PokemonOption } from '../utils/pokemonSearch'

interface Props {
  pokemon: PokemonOption
  active: boolean
  onClick: () => void
}

const AutocompleteItem = ({ pokemon, active, onClick }: Props) => {

  const image =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors
      ${active ? 'bg-blue-50' : 'hover:bg-slate-100'}`}
    >
      <img
        src={image}
        className="w-8 h-8"
      />

      <span className="text-xs text-slate-400 font-mono">
        {formatId(pokemon.id)}
      </span>

      <span className="text-sm font-medium text-slate-700">
        {capitalize(pokemon.name)}
      </span>
    </li>
  )
}

export default AutocompleteItem