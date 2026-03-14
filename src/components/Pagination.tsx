import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { setPage } from '../features/pokemon/pokemonSlice'
import {
  selectPage,
  selectTotalPages,
  selectSearchResult,
  selectStatus,
} from '../features/pokemon/pokemonSelectors'

const Pagination: React.FC = () => {
  const dispatch     = useAppDispatch()
  const page         = useAppSelector(selectPage)
  const totalPages   = useAppSelector(selectTotalPages)
  const searchResult = useAppSelector(selectSearchResult)
  const status       = useAppSelector(selectStatus)

  if (searchResult || status === 'loading' || totalPages <= 1) return null

  const goTo = (n: number) => {
    if (n < 1 || n > totalPages) return
    dispatch(setPage(n))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4)       return [1, 2, 3, 4, 5, '...', totalPages]
    if (page >= totalPages - 3)
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }

  const btnBase = "flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-500 font-semibold transition-all duration-150 cursor-pointer hover:border-red-400 hover:text-red-500 disabled:opacity-35 disabled:cursor-not-allowed"

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-10 pb-4 flex-wrap"
      aria-label="Paginación"
    >
      <button
        className={`${btnBase} px-4 h-10 text-base`}
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
      >
        ←
      </button>

      <div className="flex gap-1 items-center flex-wrap justify-center">
        {getPageNumbers().map((n, i) =>
          n === '...' ? (
            <span key={`ellipsis-${i}`} className="text-slate-400 px-1 select-none">
              …
            </span>
          ) : (
            <button
              key={n}
              onClick={() => goTo(n as number)}
              aria-current={n === page ? 'page' : undefined}
              className={`w-10 h-10 rounded-xl border-2 text-sm font-semibold transition-all duration-150 cursor-pointer ${
                n === page
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-500'
              }`}
            >
              {n}
            </button>
          )
        )}
      </div>

      <button
        className={`${btnBase} px-4 h-10 text-base`}
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
      >
        →
      </button>
    </nav>
  )
}

export default Pagination