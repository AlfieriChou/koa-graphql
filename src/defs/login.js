const loginTypeDefs = `
  type Token {
    token: String!
  }
  input LoginInput {
    phone: String!
    password: String!
  }
  extend type Mutation {
    login(input: LoginInput!): Token
  }
`

module.exports = loginTypeDefs
