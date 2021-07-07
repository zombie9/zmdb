# ZMDB

- GraphQL server using `express`, `experss-graphql` calling a deployed JSON server and the TMDB api
- React front end using Apollo Client
- Uses zombie movies as data :-)

## Run locally

- Clone the repo and install dependencies with `npm install`
- Run `npm run start`
- Visit `http://localhost:4000/graphql` for GraphiQL interface
- Visit `http://localhost:3000` for the client

### Queries:
- movie (id)
- movies 
- moviesByYear (year)
- searchTmdb (query, page)

### Mutations:
- addMovie
- deleteMovie
- editMovie

