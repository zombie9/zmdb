import React from 'react'

function Movie(props) {
  const { movie } = props

  return (
    <div className="col">
      <div className="card h-100 mb-4">
        <div className="card-body d-flex flex-column justify-content-between">
          <div classname="card-header">
            <p className="text-white mb-0">{movie.title} ({movie.year})</p>
            {/* <p className="mb-0">{movie.year}</p> */}
            {/* <p className="mb-0"><em>{movie.director}</em></p> */}
            {/* <hr className="bg-gray-dark" /> */}
          </div>          
          <img className="mw-100 border rounded" alt="poster" src={movie.tmdbPosterUrl} />
        </div>
        <div class="card-footer">
          <small class=""><em>{movie.director}</em></small>
        </div>
      </div>
    </div>
  )
}

export default Movie
