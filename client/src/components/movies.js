// import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Movie from './movie'
import { MOVIES_QUERY } from '../queries'
import { Spinner } from 'react-bootstrap'

const Movies = () => {
  // const [movies, setMovies] = useState([])
  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    fetchPolicy: 'cache-and-network'
  })
  // useEffect(() => {
  //   data && setMovies(data.movies)
  // }, [data])
  if (loading) return <div className="mt-5 w-100 d-flex justify-content-center"><Spinner animation="border" variant="warning" /></div>
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
