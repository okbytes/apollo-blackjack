const { gql } = require("apollo-server")

const typeDefs = gql`
  "Card suit lists all possible suit values"
  enum CardSuit {
    HEARTS
    SPADES
    DIAMONDS
    CLUBS
  }

  "A card from a deck of playing cards"
  type Card {
    "The display text to the player"
    name: String!
    "The suit value"
    suit: CardSuit!
    "The value of this card"
    value: Int!
  }

  type Query {
    "Get a shuffled deck of cards for play"
    cards: [Card!]!
  }
`

module.exports = typeDefs
