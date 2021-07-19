import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Movie from './movie'
import { MOVIES_QUERY } from '../queries'
import { Spinner } from 'react-bootstrap'
import { filterList } from '../reactive/variables'
import { useReactiveVar } from '@apollo/client'
import { RESULTS_PER_PAGE } from '../constant'

const Movies = () => {
  const currentFilters = useReactiveVar(filterList)
  const [currentPage, setCurrentPage] = useState(1)

  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    fetchPolicy: 'cache-first'
  })

  if (loading) return <div className="mt-5 w-100 d-flex justify-content-center"><Spinner animation="border" variant="warning" /></div>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }

  let filteredData = data.movies
  Object.entries(currentFilters).forEach(filter => {
    const [key, value] = filter
    if (currentFilters[key]?.length){
      filteredData = filteredData.filter((movie) => {
        return movie[key].toString().toLowerCase().includes(value)
      })
    }
  })

  const pointer = {
    cursor: "pointer"
  }

  const totalResults = filteredData.length
  const maxPage = Math.ceil(totalResults / RESULTS_PER_PAGE)
  const endResult = RESULTS_PER_PAGE * currentPage
  const paginatedData = filteredData.slice((endResult - RESULTS_PER_PAGE), endResult)

  const incrementPage = () => {
    currentPage < maxPage && setCurrentPage(currentPage + 1)
  }

  const decrementPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1)
  }
 
  return (
    <>
      <div className="row card-group row-cols-2 row-cols-md-4 row-cols-lg-5 g-2 g-md-4">
        {paginatedData.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="d-flex flew-row justify-content-between mt-3">
        <h3 className={currentPage <= 1 ? "text-muted pe-none" : "text-warning"}>
          <i style={pointer} className="bi-arrow-left-circle" onClick={decrementPage}></i>
        </h3>
        <h3 className={currentPage >= maxPage ? "text-muted pe-none" : "text-warning"}>
          <i style={pointer} className="bi-arrow-right-circle" onClick={incrementPage}></i>
        </h3>
      </div>
    </>
  )
}

export default Movies
