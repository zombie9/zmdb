import React from 'react'
import { useQuery } from '@apollo/client'
import Movie from './movie'
import { MOVIES_QUERY } from '../queries'
import { Spinner } from 'react-bootstrap'

const Movies = () => {
  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    fetchPolicy: 'cache-first'
  })

  if (loading) return <div className="mt-5 w-100 d-flex justify-content-center"><Spinner animation="border" variant="warning" /></div>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }
  return (
    <div className="row card-group row-cols-2 row-cols-md-4 row-cols-lg-5 g-4">
      {data.movies.map(movie => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default Movies
