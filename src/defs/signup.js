const signupTypeDefs = `
  type UserInfo {
    username: String!
    phone: String!
    description: String
  }
  input SignupInput {
    username: String!
    phone: String!
    password: String!
    description: String
  }
  extend type Mutation {
    signup(input: SignupInput): UserInfo
  }
`

module.exports = signupTypeDefs
