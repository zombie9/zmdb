import React from 'react'
import { gql, useQuery } from '@apollo/client'
import SearchResult from './searchResult'

const SEARCH_TMDB = gql`
  query SearchTmdb($query: String!) {
    searchTmdb(query: $query) {
      id,
      title,
      poster_path,
      release_date
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
  console.log(query)
  return (
    <div className="mt-4 row justify-content-center px-2">
      {data.searchTmdb.length && data.searchTmdb.map(movie => (
        <SearchResult key={movie.id} movie={movie}/>
      ))}
    </div>
  )
}

export default SearchResults
