import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Modal, Spinner } from 'react-bootstrap'
import { TMDB_POSTER } from '../constant'
import { GET_TMDB_CREDITS} from '../queries'
import DeleteMovieButton from './deleteMovieButton'

const MovieModal = ({ movie, setShowModal }) => {
  const [show, setShow] = useState(true)
  console.log(movie)
  const { loading, error, data } = useQuery(GET_TMDB_CREDITS, {
    variables: { tmdbId: parseInt(movie.tmdbId) }
  })
  if (loading) return <div className="position-absolute top-0 left-0 h-100 w-100 d-flex align-items-center justify-content-center"><Spinner animation="border" variant="warning" /></div>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }
  let filteredCrew = data.getMovieCredits.crew.filter((crewObject) => {
    return ['Director', 'Screenplay', 'Producer', 'Novel'].includes(crewObject.job)
  })
 
  filteredCrew = filteredCrew.filter((crewMember,index,self)=>self.findIndex(t=>(t.job === crewMember.job && t.name===crewMember.name))===index)
  console.log(filteredCrew)

  const handleClose = () => {
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
              src={`${TMDB_POSTER}${movie.tmdbPosterUrl}`}
            />
          </div>
          <div className="col-md-6">
          <p className="mb-0">Released: {movie.year}</p>
          {filteredCrew.map((crewMember, index) => {
            return <p key={index} className="mb-0">{crewMember.job}: {crewMember.name}</p>
          })}
          <hr />
          <p>
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
    </Modal>
  )
}

export default MovieModal
