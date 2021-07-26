import React from 'react'
import { useMutation } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { MOVIES_QUERY, ADD_MOVIE } from '../queries'
import { zombieCheck } from '../helper/zombieCheck'

const AddMovieButton = ({ movie, handleClose }) => {
  const [addMovie] = useMutation(
    ADD_MOVIE,
    {
      update(cache, { data }) {
        const newMovie = data?.addMovie
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

  const isZombieMovie = zombieCheck(movie)

  const handleAddMovie = async() => {
    await addMovie({ variables: {
      title: movie.title,
      director: movie.director,
      year: movie.year,
      tmdbId: movie.tmdbId,
      tmdbOverview: movie.tmdbOverview,
      tmdbPosterUrl: movie.tmdbPosterUrl,
      tmdbBackdropUrl: movie.tmdbBackdropUrl
    }})
    handleClose()
  }

  return (
    <div className="w-100 d-flex justify-content-between">
      {!isZombieMovie
        ? <Button className="pe-none me-2" variant="danger">
            Are you sure? <em><strong>{movie.title}</strong></em> doesn't sound like a zombie movie!
          </Button>
        : <div></div>
      }
      <Button variant="warning" onClick={handleAddMovie}>Add to ZMDB</Button>
    </div>
  )
}

export default AddMovieButton
