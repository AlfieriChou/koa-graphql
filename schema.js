const { makeExecutableSchema } = require('graphql-tools')
const path = require('path')
const dir = require('dir_filenames')

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
dir('./defs/').forEach((def) => {
  defs.push(require(path.resolve(def)))
})

let resolvers = []
const files = dir('./resolver/')
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
