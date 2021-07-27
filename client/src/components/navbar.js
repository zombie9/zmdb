import React, {useState} from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
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
      <div style={{background: '#060606'}}className="d-flex flex-row align-items-center justify-content-between mt-2 0 sticky-top">
        <h2 className="text-warning">ZMDB</h2>
        <div className="d-flex flex-row">
          { addActive 
            ? <h3><i style={pointer} className="text-warning bi-x-circle" onClick={handleAddClick}></i></h3>
            : <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    Add Movies
                  </Tooltip>
                }
              >
                <h3 className={filterActive ? "text-muted pe-none" : "text-warning"}><button className="bi-plus-circle" onClick={event => handleAddClick(event)}></button></h3>
              </OverlayTrigger>
          }
          {/* <div className="me-4"></div> */}
          { filterActive
            ? <h3><i style={pointer} className="text-warning bi-x-circle" onClick={handleFilterClick}></i></h3>
            : <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    Filter Movies
                  </Tooltip>
                }
              >
                <h3 className={addActive ? "text-muted pe-none" : "text-warning"}><button onClick={event => handleFilterClick(event)} className="bi-filter-circle"></button></h3>
              </OverlayTrigger>
          }

        </div>
        
      </div>
      <hr className="mt-0" />
      { addActive && <SearchMovies /> }
      { filterActive && <FilterMovies />}
    </>
  )
}

export default Navbar
