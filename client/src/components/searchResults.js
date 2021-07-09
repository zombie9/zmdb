import React, { useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import SearchResult from './searchResult'
import { SEARCH_TMDB } from '../queries'

function SearchResults(props) {
  const { query } = props
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [query])
  
  const { loading, error, data } = useQuery(SEARCH_TMDB, {
    variables: { query: query, page: currentPage }
  })
  
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }

  const handleNextPage = () => {
    currentPage < data.searchTmdb.total_pages
      && setCurrentPage(currentPage + 1)
  }
  return (
    <>
      <div className="mt-4 row gx-2 px-2">
        {data.searchTmdb.results.length && data.searchTmdb.results.map((movie) => (
            <SearchResult key={movie.id} movie={movie}/>
        ))}
        {currentPage < data.searchTmdb.total_pages &&
          <div className="col-lg-1 col-md-2 col-sm-3 col-4 mb-2 d-flex align-items-center justify-content-center">
            <h3>
              <i className="text-warning bi-plus-circle" onClick={handleNextPage}></i>
            </h3>
          </div>
        }
      </div>
    </>
  )
}

export default SearchResults
