const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')


const MovieType = new GraphQLObjectType({
  name: 'movie',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    director: { type: GraphQLString },
    year: { type: GraphQLInt },
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
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
