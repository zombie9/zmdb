# GraphQL Server

Basic GraphQL server using `express`, `experss-graphql` and `json-server`
Uses zombie movies as data :-)

## Run locally

Clone the repo and insall dependencies with `npm install`
Run `npm run serve` to spin up the JSON server on port 3000
Run `npm run start` to spin up the GraphQL server on port 4000
Visit `http://localhost:4000/graphql` for GraphiQL interface

Queries:
- movie (by id)
- movies (all)
- director (by id)
- directors (all)

Mutations:
- addMovie
- addDirector
