require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const mongoose = require('mongoose')

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

mongoose.connect(
  `mongodb+srv://${
    process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
  }@${process.env.MONGO_CLUSTER}.ukdob.mongodb.net/${
    process.env.MONGO_DB}?retryWrites=true&w=majority`
)
.then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000...')
  })
})
.catch(error => console.error(error))


