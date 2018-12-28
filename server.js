const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const schema = require('./src/schema')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const router = require('./src/router')

mongoose.connect('mongodb://127.0.0.1:27018/test', { useNewUrlParser: true })

const app = new Koa()
app.use(bodyParser())
app.use(jwt({
  secret: 'koa-graphql',
  credentialsRequired: false
}).unless({
  path: [/\/login/, /\/signup/]
}))
const server = new ApolloServer({ schema })
server.applyMiddleware({ app })

app.use(router.routes()).use(router.allowedMethods())

const port = 3000
const host = 'localhost'

app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`)
)
