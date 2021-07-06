import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Movie from './movie'

const MOVIES_QUERY = gql`
  query MoviesQuery {
    movies {
      id
      tmdbId
      title
      year
      director
      tmdbOverview
      tmdbPosterUrl
    }
  }
`

function Movies() {
  const { loading, error, data } = useQuery(MOVIES_QUERY)
  
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }
  console.log(data)
  return (
    <div className="row">
      {data.movies.map(movie => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default Movies
