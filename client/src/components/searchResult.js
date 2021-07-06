import React from 'react'
import { TMDB_POSTER } from '../constant'

const SearchResult = (props) => {
  const { movie } = props
  if (movie.poster_path) {
    return (
      <>
        <div className="col-lg-1 col-md-2 col-sm-3 col-4 gx-2 mb-2">
          <button className="p-0 border border-warning w-100 h-100 bg-light">
            <img 
              className="mw-100" 
              alt="poster" 
              src={`${TMDB_POSTER}${movie.poster_path}`}
            />
          </button>        
        </div>
      </>
    )
  }
  return null
}

export default SearchResult
