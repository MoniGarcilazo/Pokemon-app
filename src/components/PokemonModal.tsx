import type { Pokemon } from '../types/pokemon'
import { getTypeColor, capitalize, formatId } from '../utils/pokemonUtils'

interface Props {
  pokemon: Pokemon
  onClose: () => void
}

const PokemonModal = ({ pokemon, onClose }: Props) => {

  const image =
    pokemon.sprites.other['official-artwork'].front_default ??
    pokemon.sprites.front_default ??
    ''
  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const { bg } = getTypeColor(primaryType)

  return (
    <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-center p-10"
          style={{ backgroundColor: bg }}
        >
          <img
            src={image}
            alt={pokemon.name}
            className="w-40 h-40 object-contain"
          />
        </div>

        <div className="p-6 space-y-5">
          <div className="text-center">
            <span className="text-xs font-mono text-slate-400">
              {formatId(pokemon.id)}
            </span>
            <h2 className="text-2xl font-bold text-slate-800">
              {capitalize(pokemon.name)}
            </h2>
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {pokemon.types.map(({ type }) => {
              const colors = getTypeColor(type.name)

              return (
                <span
                  key={type.name}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.text
                  }}
                >
                  {capitalize(type.name)}
                </span>
              )
            })}
          </div>

          <div className="space-y-3">
            {pokemon.stats.map((s) => (
              <div
                key={s.stat.name}
                className="grid grid-cols-[80px_1fr_40px] items-center gap-3"
              >
                <span className="text-xs text-slate-400 capitalize">
                  {s.stat.name.replace('special-', 'Sp. ')}
                </span>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                      backgroundColor: bg
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-500 text-right">
                  {s.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonModal