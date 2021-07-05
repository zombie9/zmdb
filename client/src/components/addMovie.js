import React, { useState } from 'react'
import SearchResults from './searchResults'

function AddMovie() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  
  const handleOnChange = event => {
    setSearchQuery(event.target.value)
  }
  
  const handleSearch = () => {
    setSearchSubmitted(searchQuery)
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-md-6 d-flex flex-row">
            <input
              className="d-inline form-control w-lg-50"
              type="text"
              id="search-input"
              onChange={event => handleOnChange(event)}
              placeholder="Search..."
            />
            <button className="d-inline btn btn-warning ms-2" onClick={handleSearch}>Search</button>
          </div>
        </div>
        {searchSubmitted && <SearchResults query={searchQuery} />}
      </div>
    </div>
  )
}

export default AddMovie
