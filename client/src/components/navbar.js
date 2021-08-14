import React, {useState} from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import SearchMovies from './searchMovies'
import FilterMovies from './filterMovies'
import AuthModal from './authModal'

function Navbar() {
  const [addActive, setAddActive] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  const handleAddClick = () => {
    if (filterActive) return
    setAddActive(!addActive)
  }
  const handleFilterClick = () => {
    if (addActive) return
    setFilterActive(!filterActive)
  }
  const handleAuthClick = () => {
    console.log('boom')
    setShowModal(!showModal)
    console.log(showModal)
  }
  const pointer = {
    cursor: "pointer"
  }

  return (
    <>
      <div style={{background: '#060606'}}className="d-flex flex-row align-items-center justify-content-between mt-3 0 sticky-top">
        <h2 className="text-warning">ZMDB</h2>
        <div className="d-flex flex-row">
          { addActive 
            ? <h3><button style={pointer} className="text-warning bi-x-circle" onClick={handleAddClick}></button></h3>
            : <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    Add Movies
                  </Tooltip>
                }
              >
                <h3 className={filterActive ? "text-muted pe-none" : "text-warning"}>
                  <button className="bi-plus-circle" onClick={event => handleAddClick(event)}></button>
                </h3>
              </OverlayTrigger>
          }
          {/* <div className="me-4"></div> */}
          { filterActive
            ? <h3><button style={pointer} className="text-warning bi-x-circle" onClick={handleFilterClick}></button></h3>
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
          <h3 className="text-warning"><button className="bi-person-circle" onClick={handleAuthClick}></button></h3>
        </div>
        
      </div>
      <hr className="mt-0" />
      { addActive && <SearchMovies /> }
      { filterActive && <FilterMovies />}
      { showModal && <AuthModal setShowModal={setShowModal} /> }
    </>
  )
}

export default Navbar
