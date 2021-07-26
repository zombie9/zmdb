import React, { useState, useRef } from 'react'
import SearchResults from './searchResults'

function SearchMovies() {
  const searchRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  
  const handleSearch = () => {
    if (searchRef.current.value.length) {
      setSearchQuery(searchRef.current.value)
      setSearchSubmitted(true)
      searchRef.current.value = ''
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-md-6 d-flex flex-row">
            <input
              className="d-inline form-control w-lg-50"
              type="text"
              ref={searchRef}
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

export default SearchMovies
