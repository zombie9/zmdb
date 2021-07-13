import React from 'react'
import { useMutation } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { MOVIES_QUERY, ADD_MOVIE } from '../queries'

const AddMovieButton = ({ movie, handleClose }) => {
  const [addMovie] = useMutation(
    ADD_MOVIE,
    {
      update(cache, { data }) {
        const newMovie = data?.addMovie
        console.log(newMovie)
        const existingMovies = cache.readQuery({
          query: MOVIES_QUERY
        })

        cache.writeQuery({
          query: MOVIES_QUERY,
          data: {
            movies: [
            ...existingMovies?.movies,
            newMovie
          ]}
        })
      }
    }
  )

  const handleAddMovie = async() => {
    await addMovie({ variables: {
      title: movie.title,
      director: movie.director,
      year: movie.year,
      tmdbId: movie.tmdbId,
      tmdbOverview: movie.tmdbOverview,
      tmdbPosterUrl: movie.tmdbPosterUrl
    }})
    handleClose()
  }

  return (
    <div>
      <Button variant="warning" onClick={handleAddMovie}>
          Save to ZMDB
      </Button>
    </div>
  )
}

export default AddMovieButton
