import { gql} from '@apollo/client'

export const MOVIES_QUERY = gql`
  query MoviesQuery {
    movies {
      id
      tmdbId
      title
      year
      director
      tmdbOverview
      tmdbPosterUrl
    }
  }
`

export const GET_TMDB_CREDITS = gql`
  query GetMovieCredits($tmdbId: Int) {
    getMovieCredits(tmdbId: $tmdbId) {
      id,
      crew {
        id,
        name,
        job
      }
    }
  }
`

export const ADD_MOVIE = gql`
  mutation addMovie($title: String!, $year: Int!, $tmdbId: Int!) {
    addMovie(title: $title, year: $year, tmdbId: $tmdbId) {
      id,
      title,
      year,
      tmdbId
    }
  }
`

export const SEARCH_TMDB = gql`
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