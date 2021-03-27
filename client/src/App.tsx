import * as React from "react"
import { useLazyQuery, gql } from "@apollo/client"

const GET_CARDS = gql`
  query Query {
    cards {
      value
      suit
      name
    }
  }
`

interface Card {
  name: string
  suit: "HEARTS" | "CLUBS" | "SPADES" | "DIAMONDS"
  value: number
}

interface Hand {
  cards: Card[] | []
  score: number
}

const emptyHand: Hand = {
  cards: [],
  score: 0
}

let deck: Card[] = []

const Home = () => {
  const [hand, setHand] = React.useState<Hand>(emptyHand)
  const [getCards, { data, loading, error }] = useLazyQuery(GET_CARDS, {
    fetchPolicy: "no-cache"
  })

  React.useEffect(() => {
    getCards()
  }, [])

  React.useEffect(() => {
    if (data) {
      deck = [...data.cards]
    }
  }, [data])

  function draw() {
    const drawnCard = deck.shift()

    if (!drawnCard) {
      return
    }
    let { value } = drawnCard

    setHand((prev) => {
      if (drawnCard.name === "ACE" && prev.score + value > 21) {
        value = 1
      }

      return {
        cards: [...prev.cards, drawnCard],
        score: prev.score + value
      }
    })
  }

  function reset() {
    getCards()
    setHand(emptyHand)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>ERROR</p>
  }

  return (
    <div style={{ padding: "3rem 6rem" }}>
      {hand.score < 21 ? <h3>🃏🃏🃏 Draw a card to play 🃏🃏🃏</h3> : null}
      {hand.score === 21 ? <h3 style={{ color: "green" }}>🎉🎊✨ Polyjack ✨🎊🎉</h3> : null}
      {hand.score > 21 ? <h3 style={{ color: "red" }}>💥 Game over 💥</h3> : null}
      <p>
        <strong>Hand:</strong> [{" "}
        {hand.cards.map((card: Card, idx: number, cards: Card[]) => (
          <span key={idx}>
            {" "}
            {card.name}
            {idx === cards.length - 1 ? "" : ","}{" "}
          </span>
        ))}{" "}
        ]
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        <strong>Score:</strong> {hand.score}
      </p>

      <button style={{ marginRight: "2rem" }} onClick={draw} disabled={loading || hand.score >= 21}>
        🃏 Draw a card
      </button>
      <button onClick={reset} disabled={loading}>
        💣 Reset
      </button>
    </div>
  )
}

export default Home
