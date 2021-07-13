# ZMDB

- GraphQL server using `express`, `experss-graphql` persisting to `mongodb atlas` and fetching details from the TMDB api
- React front end using Apollo Client
- Uses zombie movies as data :-)

## Run locally

- Clone the repo and install dependencies with `npm install`
- Run `npm run start`
- Visit `http://localhost:4000/graphql` for GraphiQL interface
- Visit `http://localhost:3000` for the client

### Queries:
- movies (all)
- searchTmdb (query, page)
- getMovieCredtits (tmdbId)

### Mutations:
- addMovie

