import React from 'react'

const Pagination = ({ currentPage, maxPage, decrementPage, incrementPage}) => {
  const pointer = {
    cursor: "pointer"
  }

  return (
    <div>
      <div className="d-flex flew-row justify-content-between mt-3">
        <h4 className={currentPage <= 1 ? "text-muted pe-none" : "text-warning"}>
          <i style={pointer} className="bi-arrow-left-circle" onClick={decrementPage}></i>
        </h4>
        <h4 className={currentPage >= maxPage ? "text-muted pe-none" : "text-warning"}>
          <i style={pointer} className="bi-arrow-right-circle" onClick={incrementPage}></i>
        </h4>
      </div>
    </div>
  )
}

export default Pagination
