require('dotenv').config()
const axios = require('axios')
const { BASE_URL, TMDB_URL, TMDB_POSTER, TMDB_SEARCH } = require('./constant')

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
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    director: { type: GraphQLString },
    year: { type: GraphQLInt },
    tmdbId: { type: GraphQLString},
    tmdbOverview: {
      type: GraphQLString,
      resolve: async (movie) => {
        const movieData = await axios.get(`${TMDB_URL}/${movie.tmdbId}?api_key=${process.env.TMDB_API_KEY}`)
        return movieData.data.overview
      }
    },
    tmdbPosterUrl: {
      type: GraphQLString,
      resolve: async (movie) => {
        const movieData = await axios.get(`${TMDB_URL}/${movie.tmdbId}?api_key=${process.env.TMDB_API_KEY}`)
        return `${TMDB_POSTER}${movieData.data.poster_path}`
      }
    }
  })
})

const ImdbMovieType = new GraphQLObjectType({
  name: 'imdbMovie',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    release_date: { type: GraphQLString },
    summary: { type: GraphQLString }
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
        return axios.get(url)
        .then(res => res.data)
      }
    },
    searchTmdb: {
      type: new GraphQLList(ImdbMovieType),
      args: {
        query: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const url=`${TMDB_SEARCH}?api_key=${process.env.TMDB_API_KEY}&query=${args.query}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data.results)
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
        director: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        tmdbId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        const url = `${BASE_URL}/movies/`
        return axios.post(url, {
          title: args.title,
          director: args.director,
          year: args.year,
          tmdbId: args.tmdbId
        })
        .then(res => res.data)
      }
    },
    editMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        director: { type: GraphQLString },
        year: { type: GraphQLInt },
        tmdbId: { type: GraphQLString }
      }, 
      resolve (parentValue, args) {
        const url = `${BASE_URL}/movies/${args.id}`
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
