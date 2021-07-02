const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server is running on port 4000...')
})

