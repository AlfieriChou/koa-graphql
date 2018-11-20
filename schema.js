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

let resolvers = []
const files = glob.sync('./resolver/*.js')
if (files.length === 1) {
  resolvers = require(files[0])
} else {
  files.forEach(file => {
    resolvers.push(require(path.resolve(file)))
  })
}

const schema = makeExecutableSchema({
  typeDefs: defs,
  resolvers: resolvers
})

module.exports = schema
