import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Modal, Spinner } from 'react-bootstrap'
import { TMDB_POSTER } from '../constant'
import { GET_TMDB_CREDITS} from '../queries'
import DeleteMovieButton from './deleteMovieButton'

const MovieModal = ({ movie, setShowModal }) => {
  const [show, setShow] = useState(true)
  const { loading, error, data } = useQuery(GET_TMDB_CREDITS, {
    variables: { tmdbId: parseInt(movie.tmdbId) }
  })
  if (loading) return <div className="position-absolute top-0 left-0 h-100 w-100 d-flex align-items-center justify-content-center"><Spinner animation="border" variant="warning" /></div>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }
  const filteredCrew = [...new Set(data.getMovieCredits.crew.filter((crewObject) => {
    return ['Director', 'Screenplay', 'Producer', 'Novel', 'Makeup Artist', 'Music'].includes(crewObject.job)
  }))]

  const handleClose = () => {
    setShow(false)
    setShowModal(false)
  }

  const backdrop = `url(${movie.tmdbBackdropUrl})`
  const background = {
    backgroundImage: backdrop,
    backgroundSize: 'cover',
    backgoundPosition: 'center',
    borderRadius: '0.3em'
  }
  const panelBackground = {
    background: 'rgba(0,0,0,0.5)',
    padding: '8px',
    borderRadius: '0.25em'
  }
  
  return (
    <Modal show={show} onHide={handleClose} size="lg" className="shadow-lg">
      <div style={background}>
        <Modal.Header style={panelBackground}>
          <Modal.Title>{movie.title}</Modal.Title>
          <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img 
                className="mw-100 border rounded" 
                alt="poster" 
                src={`${TMDB_POSTER}${movie.tmdbPosterUrl}`}
              />
            </div>
            <div className="col-md-6 text-white">
            <div style={panelBackground} className="mb-3">
              <p className="mb-0">Released: {movie.year}</p>
              {filteredCrew.map((crewMember, index) => {
                return <p key={index} className="mb-0">{crewMember.job}: {crewMember.name}</p>
              })}
            </div>
     
            <p style={panelBackground}>
              {
                movie.tmdbOverview.length < 1000
                ? movie.tmdbOverview
                : `${movie.tmdbOverview.substring(0, 999)}...`
              }
            </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <DeleteMovieButton movie={movie} handleClose={handleClose} />
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default MovieModal
