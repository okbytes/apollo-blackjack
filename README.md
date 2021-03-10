# Polytomic Code Challenge

Your goal is to implement an interactive single-player card game of Blackjack. Feel free to make the UI as minimal as possible: the emphasis should be on a working solution rather than prettiness. Here are the operations to support:

Draw card
See current hand
See current score of your hand
Reset game

Each card has a score and the current score of your hand is the sum of the card scores you hold. Here is each card’s score:

2 to 10: face value
J, Q, K: 10
Ace: 11 if your current score (including the ace) is less than or equal to 21; 1 otherwise

If you draw a card that causes your current score to hit 21, the screen should print ‘Blackjack’. If your current score goes over 21, the screen should print ‘Game over’.
