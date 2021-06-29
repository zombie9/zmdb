const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLObject,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql')

const DirectorType = new GraphQLObjectType({
  name: 'director',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  })
})

const MovieType = new GraphQLObjectType({
  name: 'movie',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    director: { type: DirectorType },
    year: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const url = `http://localhost:3000/movies/${args.id}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/movies/`)
        .then(res => res.data)
      }
    },
    moviesByYear: {
      type: new GraphQLList(MovieType),
      args: {
        year: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const url = `http://localhost:3000/movies?year=${args.year}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
      }
    },
    moviesByDirector: {
      type: new GraphQLList(MovieType),
      args: {
        lastName: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const url = `http://localhost:3000/movies?director.lastName=${args.lastName}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
