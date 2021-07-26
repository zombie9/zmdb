import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Modal, Spinner } from 'react-bootstrap'
import { TMDB_POSTER, TMDB_BACKDROP } from '../constant'
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
    year: parseInt(movie.release_date?.substring(0, 4)) || 0,
    tmdbId: movie.id,
    tmdbOverview: movie.overview,
    tmdbPosterUrl: movie.poster_path ? `${TMDB_POSTER}${movie.poster_path}` : null,
    tmdbBackdropUrl: `${TMDB_BACKDROP}${movie.backdrop_path}`
  }

  const handleClose = () => {
    setShow(false)
    setShowModal(false)
  }

  const backdrop = `url(${newMovie.tmdbBackdropUrl})`
  const background = movie.backdrop_path 
    ? {
      backgroundImage: backdrop,
      backgroundSize: 'cover',
      backgoundPosition: 'center',
      borderRadius: '0.3em'
    } : {}
  const panelBackground = {
    background: 'rgba(0,0,0,0.5)',
    padding: '8px',
    borderRadius: '0.25em'
  }
  
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <div style={background}>
        <Modal.Header style={panelBackground}>
          <Modal.Title>{newMovie.title}</Modal.Title>
          <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              { newMovie.tmdbPosterUrl ? <img 
                className="mw-100 border rounded" 
                alt="poster" 
                src={`${TMDB_POSTER}${newMovie.tmdbPosterUrl}`}
              />
              : <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                No artwork found.
              </div>
              }
            </div>
            <div className="col-md-6 text-white">
              <div style={panelBackground}>
                <p className="mb-0">{newMovie.year && newMovie.year}</p>
                <p><em>{director}</em></p>
              </div>
            
            <p style={panelBackground}>
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
      </div>
    </Modal>
  )
}

export default SearchResultModal
