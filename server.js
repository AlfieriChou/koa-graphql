const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa')
const schema = require('./src/schema')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')

mongoose.connect('mongodb://47.106.84.59:28017/test', { useNewUrlParser: true })

const app = new Koa()
app.use(bodyParser())
const server = new ApolloServer({ schema })
server.applyMiddleware({ app })

const port = 3000
const host = 'localhost'

app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`)
)
