import React, { useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import SearchResult from './searchResult'
import { SEARCH_TMDB } from '../queries'
import { Spinner } from 'react-bootstrap'
import Pagination from './pagination'

function SearchResults(props) {
  const { query } = props
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [query])
  
  const { loading, error, data } = useQuery(SEARCH_TMDB, {
    variables: { query: query, page: currentPage }
  })
  
  if (loading) return <div className="mt-5 w-100 d-flex justify-content-center"><Spinner animation="border" variant="warning" /></div>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }
  
  const maxPage = data.searchTmdb.total_pages
  const incrementPage = () => {
    currentPage < maxPage && setCurrentPage(currentPage + 1)
  }
  const decrementPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1)
  }
  
  return (
    <>
      <div className="mt-4 row gx-2 px-2">
        {data.searchTmdb.results.length && data.searchTmdb.results.map((movie) => (
            <SearchResult key={movie.id} movie={movie}/>
        ))}
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          decrementPage={decrementPage}
          incrementPage={incrementPage}
        />
      </div>
    </>
  )
}

export default SearchResults
