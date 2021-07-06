import React from 'react'

function Movie(props) {
  const { movie } = props

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card mb-4">
        <div className="card-body">
          <p className="text-white text-bold mb-0">{movie.title}</p>
          <p className="mb-0">({movie.year})</p>
          <p><em>{movie.director}</em></p>
          <hr />
          <img className="mw-100" alt="poster" src={movie.tmdbPosterUrl} />
        </div>
      </div>
    </div>
  )
}

export default Movie
