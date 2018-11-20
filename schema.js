const { userResolvers, userTypeDefs } = require('./schemas/user')
const { makeExecutableSchema } = require('graphql-tools')

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

module.exports = schema
