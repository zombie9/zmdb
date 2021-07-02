const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const { BASE_URL } = require('./constant')

const DirectorType = new GraphQLObjectType({
  name: 'director',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (director) => {
        return axios.get(`${BASE_URL}/movies?directorId=${director.id}`)
        .then(res => res.data)
      }
    }
  })
})

const MovieType = new GraphQLObjectType({
  name: 'movie',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    directorId: { type: GraphQLInt },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve: (movie) => {
        return axios.get(`${BASE_URL}/directors/${movie.directorId}`)
        .then(res => res.data)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const url = `${BASE_URL}/movies/${args.id}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parentValue, args) {
        return axios.get(`${BASE_URL}/movies/`)
        .then(res => res.data)
      }
    },
    moviesByYear: {
      type: new GraphQLList(MovieType),
      args: {
        year: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const url = `${BASE_URL}/movies?year=${args.year}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
      }
    },
    director: {
      type: DirectorType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const url = `${BASE_URL}/directors/${args.id}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parentValue, args) {
        return axios.get(`${BASE_URL}/directors/`)
        .then(res => res.data)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLInt) },
        year: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        const url = `${BASE_URL}/movies/`
        return axios.post(url, {
          title: args.title,
          directorId: args.directorId,
          year: args.year
        })
        .then(res => res.data)
      }
    },
    editMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        directorId: { type: GraphQLInt },
        year: { type: GraphQLInt }
      }, 
      resolve (parentValue, args) {
        const url = `${BASE_URL}/movies/${args.id}`
        console.log(url)
        return axios.patch(url, args)
        .then(res => res.data)
      }
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve (parentValue, args) {
        const url = `${BASE_URL}/movies/${args.id}`
        console.log(url)
        return axios.delete(url, args)
        .then(res => res.data)
      }
    },
    addDirector: {
      type: DirectorType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        const url = `${BASE_URL}/directors/`
        return axios.post(url, {
          firstName: args.firstName,
          lastName: args.lastName
        })
        .then(res => res.data)
      }
    },
    editDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      }, 
      resolve (parentValue, args) {
        const url = `${BASE_URL}/directors/${args.id}`
        console.log(url)
        return axios.patch(url, args)
        .then(res => res.data)
      }
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve (parentValue, args) {
        const url = `${BASE_URL}/directors/${args.id}`
        console.log(url)
        return axios.delete(url, args)
        .then(res => res.data)
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
