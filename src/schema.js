const { makeExecutableSchema } = require('graphql-tools')
const path = require('path')
const dir = require('dir_filenames')
const appRoot = require('app-root-path')

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
dir(`${appRoot}/src/defs/`).forEach((def) => {
  defs.push(require(path.resolve(def)))
})

let resolvers = []
const files = dir(`${appRoot}/src/resolver/`)
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
