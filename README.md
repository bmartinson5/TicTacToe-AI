# Tic-Tac-Toe

#### By Ben Martinson

## [Go to Site - https://bmartinson5.github.io/TicTacToe-AI](https://bmartinson5.github.io/TicTacToe-AI)

## Description

This is a single page web application that plays Tic-Tac-Toe against you. The computer player is unbeatable (either draws of wins) because it employs optimal strategy to play a perfect game no matter what spots the user chooses. 

The algorithm was made based on these rules (https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy):

* Win: If the player has two in a row, they can place a third to get three in a row.
* Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
* Fork: Create an opportunity where the player has two ways to win (two non-blocked lines of 2).
* Blocking an opponent's fork: If there is only one possible fork for the opponent, the player should block it. Otherwise, the player should block all forks in any way that simultaneously allows them to create two in a row. Otherwise, the player should create a two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork. For example, if "X" has two opposite corners and "O" has the center, "O" must not play a corner in order to win. (Playing a corner in this scenario creates a fork for "X" to win.)
* Center: A player marks the center. (If it is the first move of the game, playing on a corner gives the second player more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
* Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
* Empty corner: The player plays in a corner square.
* Empty side: The player plays in a middle square on any of the 4 sides.


## Setup/Installation Requirements

1. Clone the repo
2. Open the index.html file in a browser


## Known Bugs

There are no known bugs at this time.

## Support and contact details

If you find a bug, run into any issues, or have questions, ideas or concerns please feel free to submit an issue for the project here on GitHub or email me at benmartinson92@gmail.com

## Technologies Used

Javascript, Jquery, css, html


### License

MIT License

Copyright (c) 2019, Ben Martinson
