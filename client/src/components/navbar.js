import React, {useState} from 'react'
import SearchMovies from './searchMovies'

function Navbar() {
  const [addActive, setAddActive] = useState(false)
  const handleClick = (event) => {
    setAddActive(!addActive)
  }

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mt-2">
        <h2 className="text-warning">ZMDB</h2>
        { addActive 
          ? <h3><i className="text-warning bi-x-circle" onClick={event => handleClick(event)}></i></h3>
          : <h3><i className="text-warning bi-plus-circle" onClick={event => handleClick(event)}></i></h3>
        }
      </div>
      { addActive && <SearchMovies /> }
    </>
  )
}

export default Navbar
