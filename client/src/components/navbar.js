import React, {useState} from 'react'
import SearchMovies from './searchMovies'
import FilterMovies from './filterMovies'

function Navbar() {
  const [addActive, setAddActive] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  
  const handleAddClick = () => {
    if (filterActive) return
    setAddActive(!addActive)
  }
  const handleFilterClick = () => {
    if (addActive) return
    setFilterActive(!filterActive)
  }
  const pointer = {
    cursor: "pointer"
  }

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mt-2">
        <h2 className="text-warning">ZMDB</h2>
        <div className="d-flex flex-row">
          { addActive 
            ? <h3><i style={pointer} className="text-warning bi-x-circle me-4" onClick={handleAddClick}></i></h3>
            : <h3 className={filterActive ? "text-muted pe-none" : "text-warning"}><i style={pointer} className="bi-plus-circle me-4" onClick={event => handleAddClick(event)}></i></h3>
          }
          { filterActive
            ? <h3><i style={pointer} className="text-warning bi-x-circle" onClick={handleFilterClick}></i></h3>
            : <h3 className={addActive ? "text-muted pe-none" : "text-warning"}><i style={pointer} onClick={event => handleFilterClick(event)} className="bi-filter-circle"></i></h3>
          }

        </div>
        
      </div>
      { addActive && <SearchMovies /> }
      { filterActive && <FilterMovies />}
    </>
  )
}

export default Navbar
