import React from 'react'
import { useMutation } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { MOVIES_QUERY, DELETE_MOVIE } from '../queries'

const DeleteMovieButton = ({ movie, handleClose }) => {
  const [deleteMovie] = useMutation(
    DELETE_MOVIE,
    {
      update(cache) {
        const deletedMovieId = movie.id
        const existingMovies = cache.readQuery({
          query: MOVIES_QUERY
        })
        const updatedMovies = existingMovies.movies.filter(movie => (movie.id !== deletedMovieId))
        cache.writeQuery({
          query: MOVIES_QUERY,
          data: { movies: updatedMovies }
        })
      }
    }
  )

  const handleDeleteMovie = async() => {
    await deleteMovie({ variables: {
      id: movie.id
    }})
    handleClose()
  }

  return (
    <div>
      <Button variant="warning" onClick={handleDeleteMovie}>
          Remove from ZMDB
      </Button>
    </div>
  )
}

export default DeleteMovieButton