import React from 'react'

function Movie(props) {
  const { movie } = props

  return (
    <div className="card mb-3">
      <div className="card-body">
        {movie.title} ({movie.year}): {movie.director.firstName} {movie.director.lastName}
      </div>
    </div>
  )
}

export default Movie
