const userResolvers = require('./resolver/user')
const { makeExecutableSchema } = require('graphql-tools')
const glob = require('glob')
const path = require('path')

const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`
const defs = []
defs.push(rootTypeDefs)
glob.sync('./defs/*.js').forEach((def) => {
  defs.push(require(path.resolve(def)))
})

const schema = makeExecutableSchema({
  typeDefs: defs,
  resolvers: userResolvers
})

module.exports = schema
