const loginTypeDefs = `
  type JWT {
    token: String!
  }
  input LoginInput {
    phone: String!
    password: String!
  }
  extend type Mutation {
    login(input: LoginInput): JWT
  }
`

module.exports = loginTypeDefs
