import React from 'react'

function Movie(props) {
  const { movie } = props

  return (
    <div className="card mb-3 col-lg-3">
      <div className="card-body">
        {movie.title} ({movie.year}): {movie.director.firstName} {movie.director.lastName}
        <p>{movie.tmdbOverview}</p>
        <img alt="poster" src={movie.tmdbPosterUrl} />
      </div>
    </div>
  )
}

export default Movie
