import React from 'react'
import { gql, useQuery } from '@apollo/client'
import SearchResult from './searchResult'

const SEARCH_TMDB = gql`
  query SearchTmdb($query: String!) {
    searchTmdb(query: $query) {
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
  const { loading, error, data } = useQuery(SEARCH_TMDB, {
    variables: { query: query }
  })
  
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }

  const checkNextPage = (index) => {
    return index === data.searchTmdb.results.length - 1
  }
  console.log(data)
  return (
    <>
      <div className="mt-4 row justify-content-center gx-2 px-2">
        {data.searchTmdb.results.length && data.searchTmdb.results.map((movie, index) => (
          <>
            <SearchResult key={movie.id} movie={movie}/>
            {checkNextPage(index)
              ? <div key={index} className="col-lg-1 col-md-2 col-sm-3 col-4 mb-2 d-flex align-items-center justify-content-center">
                  <h3><i className="text-warning bi-plus-circle" onClick={event => console.log(event)}></i></h3>
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
