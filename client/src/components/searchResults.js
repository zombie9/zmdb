import React from 'react'
import { gql, useQuery } from '@apollo/client'

const SEARCH_TMDB = gql`
  query SearchTmdb($query: String!) {
    searchTmdb(query: $query) {
      id,
      title,
      poster_path
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
  console.log(data)
  return (
    <div className="">
      {data.searchTmdb.map(movie => (
        <li>{movie.title}</li>
      ))}
    </div>
  )
}

export default SearchResults
