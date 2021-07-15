import React, { useState } from 'react'
import { TMDB_POSTER } from '../constant'
import SearchResultModal from './searchResultModal'

const SearchResult = (props) => {
  const { movie } = props
  
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(true)
  }

  if (movie.poster_path) {
    return (
      <>
        <div className="col-lg-1 col-md-2 col-sm-3 col-4 mb-2">
          <button 
            className="p-0 border w-100 h-100 bg-light"
            onClick={handleClick}
          >
            <img 
              className="mw-100" 
              alt="poster" 
              src={`${TMDB_POSTER}${movie.poster_path}`}
            />
          </button>     
        </div>
        {showModal && <SearchResultModal movie={movie} setShowModal={setShowModal} />}   
      </>
    )
  }
  return null
}

export default SearchResult
