import React, { useState } from 'react'
import SearchResults from './searchResults'

function AddMovie() {
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  
  const handleOnChange = event => {
    setInputValue(event.target.value)
  }
  
  const handleSearch = () => {
    if (inputValue.length) {
      setSearchQuery(inputValue)
      setSearchSubmitted(true)
      setInputValue('')
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
              id="search-input"
              onChange={event => handleOnChange(event)}
              placeholder="Search..."
              value={inputValue}
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
