import SearchBar from './SearchBar'

const Header = () => {

  return (
    <header className="relative bg-[#3b4cca] px-6 py-6">
      <div className="relative max-w-6xl mx-auto">

        <div className="grid items-center gap-4 md:grid-cols-3">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-white/70 text-xs uppercase tracking-widest">
              Entrenadora
            </span>
            <span className="text-[#ffde00] font-bold text-base">
              Mónica Garcilazo Cuevas
            </span>
          </div>

          <div className="text-center order-last md:order-0">
            <p className="text-white/70 text-[11px] uppercase tracking-[0.2em] font-semibold">
              Pokémon Searcher
            </p>
            <h1 className="text-3xl font-black text-[#ffde00] drop-shadow-[2px_2px_0px_#2a3aa5]">
              PokéMoni
            </h1>
          </div>

          <div className="hidden md:flex justify-end">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              <span className="text-white text-xs font-medium">
                Online
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 max-w-md mx-auto">
          <SearchBar />
        </div>

      </div>
    </header>
  )
}

export default Header