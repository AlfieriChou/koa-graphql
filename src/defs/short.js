const shortTypeDefs = `
  type Short {
    id: ID!
    url: String!
    timestamp: String!
    short_hash: String!
  }
  extend type Query {
    short(id: String!): Short
  }
  input ShortInput {
    url: String!
  }
  extend type Mutation {
    addShort(input: ShortInput!): Short
  }
`

module.exports = shortTypeDefs
