import React, { useState, useEffect} from 'react'
import { gql, useQuery } from '@apollo/client'
import SearchResult from './searchResult'

const SEARCH_TMDB = gql`
  query SearchTmdb($query: String!, $page: Int) {
    searchTmdb(query: $query, page: $page) {
      page,
      total_pages,
      total_results,
      results {
        id,
        title,
        poster_path,
        release_date,
        overview
      }
    }
  }
`

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

  const checkNextPage = (index) => {
    return index === data.searchTmdb.results.length - 1
      && currentPage < data.searchTmdb.total_pages
  }
  const handleNextPage = () => {
    currentPage < data.searchTmdb.total_pages
      && setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <div className="mt-4 row gx-2 px-2">
        {data.searchTmdb.results.length && data.searchTmdb.results.map((movie, index) => (
          <>
            <SearchResult key={movie.id} movie={movie}/>
            {checkNextPage(index)
              ? <div key={index} className="col-lg-1 col-md-2 col-sm-3 col-4 mb-2 d-flex align-items-center justify-content-center">
                  <h3 key={index}><i className="text-warning bi-plus-circle" onClick={handleNextPage}></i></h3>
                </div>
              : null
            }
          </>
        ))}
      </div>
    </>
  )
}

export default SearchResults
