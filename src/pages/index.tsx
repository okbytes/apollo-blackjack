import * as React from "react"
import cn from "clsx"

const cards = [
  {
    name: "2",
    suit: "hearts",
    score: 2
  },
  {
    name: "3",
    score: 3
  },
  {
    name: "4",
    score: 4
  },
  {
    name: "5",
    score: 5
  },
  {
    name: "6",
    score: 6
  },
  {
    name: "7",
    score: 7
  },
  {
    name: "8",
    score: 8
  },
  {
    name: "9",
    score: 9
  },
  {
    name: "10",
    score: 10
  },
  {
    name: "J",
    score: 10
  },
  {
    name: "Q",
    score: 10
  },
  {
    name: "K",
    score: 10
  },
  {
    name: "A",
    score: 1
  },
  {
    name: "2",
    score: 2
  },
  {
    name: "3",
    score: 3
  },
  {
    name: "4",
    score: 4
  },
  {
    name: "5",
    score: 5
  },
  {
    name: "6",
    score: 6
  },
  {
    name: "7",
    score: 7
  },
  {
    name: "8",
    score: 8
  },
  {
    name: "9",
    score: 9
  },
  {
    name: "10",
    score: 10
  },
  {
    name: "J",
    score: 10
  },
  {
    name: "Q",
    score: 10
  },
  {
    name: "K",
    score: 10
  },
  {
    name: "A",
    score: 1
  },
  {
    name: "2",
    score: 2
  },
  {
    name: "3",
    score: 3
  },
  {
    name: "4",
    score: 4
  },
  {
    name: "5",
    score: 5
  },
  {
    name: "6",
    score: 6
  },
  {
    name: "7",
    score: 7
  },
  {
    name: "8",
    score: 8
  },
  {
    name: "9",
    score: 9
  },
  {
    name: "10",
    score: 10
  },
  {
    name: "J",
    score: 10
  },
  {
    name: "Q",
    score: 10
  },
  {
    name: "K",
    score: 10
  },
  {
    name: "A",
    score: 1
  },
  {
    name: "2",
    score: 2
  },
  {
    name: "3",
    score: 3
  },
  {
    name: "4",
    score: 4
  },
  {
    name: "5",
    score: 5
  },
  {
    name: "6",
    score: 6
  },
  {
    name: "7",
    score: 7
  },
  {
    name: "8",
    score: 8
  },
  {
    name: "9",
    score: 9
  },
  {
    name: "10",
    score: 10
  },
  {
    name: "J",
    score: 10
  },
  {
    name: "Q",
    score: 10
  },
  {
    name: "K",
    score: 10
  },
  {
    name: "A",
    score: 1
  }
]

let tempCards = [...cards]

const Home = () => {
  const initState = {
    hand: [],
    score: 0
  }
  const [myHand, setMyHand] = React.useState(initState)

  function draw() {
    const randomIdx = Math.floor(Math.random() * Math.floor(cards.length - 1))
    const [randomCard] = tempCards.splice(randomIdx, 1)

    setMyHand((prev) => {
      let score = randomCard.score

      if (randomCard.name === "A" && prev.score <= 21) {
        if (prev.score + 11 <= 21) {
          score = 11
        } else {
          score = 1
        }
      }

      return {
        hand: [...prev.hand, randomCard],
        score: prev.score + score
      }
    })
  }

  function reset() {
    // clear out tempCards and re-add all the goodies
    setMyHand(initState)
    // reset my hand
    tempCards = [...cards]
  }

  const btnStyles = "block py-2 px-3 my-4 bg-gray-50 border rounded-md"

  return (
    <div className="p-4">
      {myHand.score === 21 ? <p>Blackjack</p> : null}
      {myHand.score > 21 ? <p>Game over</p> : null}
      <p>
        hand:
        {myHand.hand.map((card, idx) => (
          <span key={idx}> {card.name} </span>
        ))}
      </p>
      <p>score: {myHand.score}</p>

      <button
        className={cn(
          btnStyles,
          myHand.score >= 21
            ? "cursor-not-allowed text-gray-400 bg-gray-200 border-gray-200"
            : "border-gray-500"
        )}
        onClick={draw}
        disabled={myHand.score >= 21}
      >
        draw card
      </button>

      <button className={cn(btnStyles, "border-gray-500")} onClick={reset}>
        reset
      </button>
    </div>
  )
}

export default Home
