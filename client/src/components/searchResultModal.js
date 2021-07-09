import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Modal, Button } from 'react-bootstrap'
import { TMDB_POSTER } from '../constant'
import { MOVIES_QUERY, ADD_MOVIE } from '../queries'

const SearchResultModal = ({ movie, setShowModal }) => {
  console.log(movie)
  const [show, setShow] = useState(true)

  const [addMovie] = useMutation(
    ADD_MOVIE,
    // {
    //   update(cache, { data }) {
    //     const newMovie = data?.addMovie
    //     const existingMovies = cache.readQuery({
    //       query: MOVIES_QUERY
    //     })

    //     cache.writeQuery({
    //       query: MOVIES_QUERY,
    //       data: [
    //         ...existingMovies?.movies,
    //         newMovie
    //       ]
    //     })
    //   }
    // },
    {
      refetchQueries: [ { query: MOVIES_QUERY } ]
    }
  )

  const handleClose = () => {
    setShow(false)
    setShowModal(false)
  }

  const handleAddMovie = async() => {
    await addMovie({ variables: {
      title: movie.title,
      year: parseInt(movie.release_date.substring(0, 4)),
      tmdbId: movie.id
    }})
    setShow(false)
    setShowModal(false)
  }
  
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>{movie.title}</Modal.Title>
        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img 
              className="mw-100 border rounded" 
              alt="poster" 
              src={`${TMDB_POSTER}${movie.poster_path}`}
            />
          </div>
          <div className="col-md-6">
            <p><em>{movie.director}</em></p>
            <p>
              {
                movie.overview.length < 1000
                ? movie.overview
                : `${movie.overview.substring(0, 999)}...`
              }
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleAddMovie}>
          Save to ZMDB
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SearchResultModal
