# ZMDB

- GraphQL server using `experss-graphql` 
- Persisting to `mongodb atlas` and consuming data from the TMDB api
- React front end using Apollo Client
- Apollo cache for state management - including `reactive vars`
- Uses zombie movies as data :-)

## Run locally

- Clone the repo and install dependencies with `npm install`
- All `.env` variables will need to be defined - Mongo access details, TMDB api key etc.
- Run `npm start`
- Visit `http://localhost:4000/graphql` for GraphiQL interface
- Visit `http://localhost:3000` for the client

### Features

- Search for zombie movies on TMDB add add them to ZMDB
- All movies displayed with poster images & pagination
- View details and overview of movies before adding
- Filter ZMDB movies by title, director and/or year
- View movie details and credits for saved movies
- Remove movies from ZMDB

### Queries:
- movies (all)
- searchTmdb (query, page)
- getMovieCredtits (tmdbId)

### Mutations:
- addMovie
- deleteMovie

