const { gql } = require("@apollo/server")

const typeDefs = gql`

  type Query {
    "Query description"
    tracksForHome:[Track!]!
  }

  "descirption ofthis thing"
  type Track {
    "description of this field"
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
  }

  type Author {

  }
`

module.exports = typeDefs
