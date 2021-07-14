require('dotenv').config()
const axios = require('axios')
const { BASE_URL, TMDB_URL, TMDB_SEARCH } = require('./constant')
const Movie = require('./models/movie')

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
    tmdbId: { type: GraphQLString},
    tmdbOverview: { type: GraphQLString },
    tmdbPosterUrl: { type: GraphQLString }
  })
})

const TmdbMovieType = new GraphQLObjectType({
  name: 'tmdbMovie',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    release_date: { type: GraphQLString },
    overview: { type: GraphQLString },
  })
})

const TmdbObjectType = new GraphQLObjectType({
  name: 'tmdbOject',
  fields: () => ({
    page: { type: GraphQLInt },
    total_pages: { type: GraphQLInt },
    total_results: { type: GraphQLInt },
    results: { type: GraphQLList(TmdbMovieType) }
  })
})

const TmdbCrewType = new GraphQLObjectType({
  name: 'tmdbCrew',
  fields: () => ({
    id: { type: GraphQLInt },
    job: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

const TmdbCreditType = new GraphQLObjectType({
  name: 'tmdbCredit',
  fields: () => ({
    id: { type: GraphQLInt },
    crew: { type: GraphQLList(TmdbCrewType) }
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
      resolve(parent, args) {
        const url = `${BASE_URL}/movies/${args.id}`
        return axios.get(url)
        .then(res => res.data)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find()
        .then(movies => {
          return movies
        })
        .catch(error => console.error(error))
      }
    },
    moviesByYear: {
      type: new GraphQLList(MovieType),
      args: {
        year: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const url = `${BASE_URL}/movies?year=${args.year}`
        return axios.get(url)
        .then(res => res.data)
      }
    },
    searchTmdb: {
      type: TmdbObjectType,
      args: {
        query: { type: GraphQLString },
        page: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const url=`${TMDB_SEARCH}?api_key=${process.env.TMDB_API_KEY}&query=${args.query}&page=${args.page || 1}`
        console.log(url)
        return axios.get(url)
        .then(res => res.data)
      }
    },
    getMovieCredits: {
      type: TmdbCreditType,
      args: {
        tmdbId: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const url = `${TMDB_URL}/${args.tmdbId}/credits?api_key=${process.env.TMDB_API_KEY}`
        return axios.get(url)
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
        director: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        tmdbId: { type: new GraphQLNonNull(GraphQLInt) },
        tmdbOverview: { type: new GraphQLNonNull(GraphQLString) },
        tmdbPosterUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const movie = new Movie(args)
        console.log(movie)
        return movie.save().then((movie) => {
          return movie
        }).catch(error => console.log(error))
      }
    },
    editMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        director: { type: GraphQLString },
        year: { type: GraphQLInt },
        tmdbId: { type: GraphQLString },
        tmdbOverview: { type: GraphQLString },
        tmdbPosterUrl: { type: GraphQLString }
      }, 
      resolve (parent, args) {
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
      resolve (parent, args) {
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
