import React from 'react'
import { useMutation } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { DELETE_MOVIE } from '../queries'

const DeleteMovieButton = ({ movie }) => {
  const [deleteMovie] = useMutation(
    DELETE_MOVIE,
    {
      update(cache) {
        const deletedMovieId = movie.id
        cache.modify({
          fields: {
            movies(list, { readField }) {
              return list.filter((movie) => readField('id', movie) !== deletedMovieId)
            }
          }
        })
      }
    }
  )

  const handleDeleteMovie = async() => {
    await deleteMovie({ variables: {
      id: movie.id
    }})
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