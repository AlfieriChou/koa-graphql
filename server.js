const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const { makeExecutableSchema } = require('graphql-tools')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const { userResolvers, userTypeDefs } = require('./schemas/user')

mongoose.connect('mongodb://47.106.84.59:28017/test', { useNewUrlParser: true })

const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs],
  resolvers: userResolvers
})

const server = new ApolloServer({ schema })

const app = new Koa()
app.use(bodyParser())

server.applyMiddleware({ app })

const port = 3000
const host = 'localhost'

app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`)
)
