import * as React from "react"

import { gql, useLazyQuery } from "@apollo/client"

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
  const [getCards, { data, loading, error }] = useLazyQuery<{ cards: Card[] }>(GET_CARDS, {
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

  if (error) {
    return <p>ERROR</p>
  }

  return (
    <div style={{ padding: "3rem 6rem" }}>
      {hand.score < 21 ? (
        <h3 style={{ color: "rebeccapurple" }}>Draw a card to play 🃏</h3>
      ) : hand.score === 21 ? (
        <h3 style={{ color: "green" }}>Polyjack ✨🎊🎉</h3>
      ) : (
        <h3 style={{ color: "red" }}>Game over 💥</h3>
      )}
      <p>
        <strong>Hand:</strong>
        {hand.cards.map((card: Card, idx: number, cards: Card[]) => (
          <span key={idx}>
            {" "}
            {card.name}
            {idx === cards.length - 1 ? "" : ","}{" "}
          </span>
        ))}
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        <strong>Score:</strong> {hand.score}
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button
            style={{
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: "0.75rem",
              background: "white",
              padding: "0.425rem 0.5rem",
              borderRadius: "0.35rem",
              border: "none",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 4px 0 rgba(0,0,0,0.15)",
              marginRight: "2rem"
            }}
            onClick={draw}
            disabled={hand.score >= 21}
          >
            🃏 Draw a card
          </button>
          <button
            style={{
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: "0.75rem",
              background: "white",
              padding: "0.425rem 0.5rem",
              borderRadius: "0.35rem",
              border: "none",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 4px 0 rgba(0,0,0,0.15)"
            }}
            onClick={reset}
          >
            💣 Reset
          </button>
        </>
      )}
    </div>
  )
}

export default Home
