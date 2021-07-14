import React from 'react'

const FilterMovies = () => {
  return (
    <div>
      <div className="card mb-4">
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <input
              className="d-inline form-control w-lg-25"
              type="text"
              id="search-input"            
              placeholder="Filter Name..."            
            />
          </div>
          <div className="col-md-3">
            <input
              className="d-inline form-control w-lg-25"
              type="text"
              id="search-input"            
              placeholder="Filter Director..."             
            />
          </div>
          <div className="col-md-2">
            <input
              className="d-inline form-control"
              type="text"
              id="search-input"            
              placeholder="Filter Year..."             
            />
          </div>
          <div className="col-md-1">
            <button className="d-inline btn btn-warning w-100">Apply</button>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default FilterMovies
