const cards = require("./cards-db")

module.exports = {
  Query: {
    cards() {
      const temp = [...cards]
      const shuffledCards = []

      while (temp.length > 0) {
        const idx = Math.floor(Math.random() * Math.floor(temp.length))
        const [card] = temp.splice(idx, 1)
        shuffledCards.push(card)
      }

      return shuffledCards
    }
  }
}
