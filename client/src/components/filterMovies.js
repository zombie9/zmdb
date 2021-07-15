import React, {useRef} from 'react'
import { filterList } from '../reactive/variables'

const FilterMovies = () => {
  const titleRef = useRef(null)
  const directorRef = useRef(null)
  const yearRef = useRef(null)

  const applyfilters = () => {
    filterList({
      title: titleRef.current.value.toLowerCase(),
      director: directorRef.current.value.toLowerCase(),
      year: yearRef.current.value
    })
  }

  const clearfilters = () => {
    titleRef.current.value = ''
    directorRef.current.value = ''
    yearRef.current.value = ''
    filterList({
      title: null,
      director: null,
      year: null
    })
  }

  return (
    <div>
      <div className="card mb-4">
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <input
              className="d-inline form-control w-lg-25"
              type="text"
              ref={titleRef}
              id="titleInput"         
              placeholder="Filter Title..."            
            />
          </div>
          <div className="col-md-3">
            <input
              className="d-inline form-control w-lg-25"
              type="text"
              ref={directorRef}         
              placeholder="Filter Director..."             
            />
          </div>
          <div className="col-md-2">
            <input
              className="d-inline form-control"
              type="text"
              ref={yearRef}            
              placeholder="Filter Year..."             
            />
          </div>
          <div className="col-md-1">
            <button onClick={applyfilters} className="d-inline btn btn-warning w-100">Apply</button>
          </div>
          <div className="col-md-1">
            <button onClick={clearfilters} className="d-inline btn btn-warning w-100">Clear</button>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default FilterMovies
