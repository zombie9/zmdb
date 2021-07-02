import React from 'react'
import { gql, useQuery} from '@apollo/client'

const MOVIES_QUERY = gql`
  query MoviesQuery {
    movies {
      id
      tmdbId
      title
      year
      director {
        firstName
        lastName
      }
    }
  }
`

function Movies() {
  const { loading, error, data } = useQuery(MOVIES_QUERY)
  
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error :(</p>
  }
  console.log(data)
  return data.movies.map(({ title, year, id }) => (
    <div key={id}>
      <p>
        {title}: {year}
      </p>
    </div>
  ))
}

export default Movies
