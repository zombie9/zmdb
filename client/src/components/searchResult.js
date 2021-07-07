import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'
import { TMDB_POSTER } from '../constant'

const SearchResult = (props) => {
  const { movie } = props
  
  const [modal, setModal] = useState(null)
  const movieModal = useRef()

  useEffect(() => {
    movieModal.current && setModal(
      new Modal(movieModal.current)
    )
  }, [])

  if (movie.poster_path) {
    return (
      <>
        <div className="col-lg-1 col-md-2 col-sm-3 col-4 mb-2">
          <button 
            className="p-0 border w-100 h-100 bg-light"
            onClick={() => modal.show()}
          >
            <img 
              className="mw-100" 
              alt="poster" 
              src={`${TMDB_POSTER}${movie.poster_path}`}
            />
          </button>        
        </div>

        <div className="modal fade" ref={movieModal} tabIndex="-1" aria-labelledby="Movie Details Modal" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title">{movie.title} ({movie.release_date.substring(0, 4)})</h5>
              </div>
              <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img 
                    className="mw-100 border rounded" 
                    alt="poster" 
                    src={`${TMDB_POSTER}${movie.poster_path}`}
                  />
                </div>
                <div className="col-md-6">
                  <p>
                    {
                      movie.overview.length < 1000
                      ? movie.overview
                      : `${movie.overview.substring(0, 999)}...`
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning">Add to ZMDB</button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  return null
}

export default SearchResult
