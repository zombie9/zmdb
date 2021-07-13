import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Modal, Spinner } from 'react-bootstrap'
import { TMDB_POSTER } from '../constant'
import { GET_TMDB_CREDITS} from '../queries'
import AddMovieButton from './addMovieButton'

const SearchResultModal = ({ movie, setShowModal }) => {
  const [show, setShow] = useState(true)

  const { loading, error, data } = useQuery(GET_TMDB_CREDITS, {
    variables: { tmdbId: movie.id }
  })
  if (loading) return <div className="position-absolute top-0 left-0 h-100 w-100 d-flex align-items-center justify-content-center"><Spinner animation="border" variant="warning" /></div>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }
  const directorObject = data.getMovieCredits.crew.find(crewMember => crewMember.job === 'Director' || crewMember.job === 'Screenplay')
  const director = directorObject ? directorObject.name : 'Director not found.'
  const newMovie = {
    title: movie.title,
    director: director,
    year: parseInt(movie.release_date.substring(0, 4)),
    tmdbId: movie.id,
    tmdbOverview: movie.overview,
    tmdbPosterUrl: `${TMDB_POSTER}${movie.poster_path}`
  }

  const handleClose = () => {
    setShow(false)
    setShowModal(false)
  }
  
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>{newMovie.title}</Modal.Title>
        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img 
              className="mw-100 border rounded" 
              alt="poster" 
              src={`${TMDB_POSTER}${newMovie.tmdbPosterUrl}`}
            />
          </div>
          <div className="col-md-6">
          <p className="mb-0">{newMovie.year}</p>
            <p><em>{director}</em></p>
            <p>
              {
                movie.overview.length < 1000
                ? movie.overview
                : `${movie.tmdbOverview.substring(0, 999)}...`
              }
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddMovieButton movie={newMovie} handleClose={handleClose} />
      </Modal.Footer>
    </Modal>
  )
}

export default SearchResultModal
