import React, { useState } from 'react'
import MovieModal from './movieModal'

function Movie(props) {
  const { movie } = props

  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className="col">
        <button className="card h-100 mb-4" onClick={handleClick}>
          <div className="card-body d-flex flex-column justify-content-between text-start">
            <div className="">
              <p className="text-white mb-0">{movie.title} ({movie.year})</p>
            </div>
            <img 
              className="mw-100 border rounded" 
              alt="poster" 
              src={movie.tmdbPosterUrl} />
          </div>
          <div className="card-footer">
            <small className="text-dark"><em>{movie.director}</em></small>
          </div>
        </button>
      </div>
      {showModal && <MovieModal movie={movie} setShowModal={setShowModal} />}
    </>
  )
}

export default Movie
