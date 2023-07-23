# Gomoku Game

## Background

This project is a browser-based version of the classic Gomoku game, also known as Five in a Row. The game is played on a grid of squares, and the objective is to be the first to get five of your stones in a row, either horizontally, vertically, or diagonally.

This game was implemented using TypeScript and HTML, bundled with Parcel. It features a responsive design that fits screens of all sizes and offers an intuitive and interactive gaming experience.

## Getting Started

To get the game up and running on your local machine, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine. You can download Node.js [here](https://nodejs.org/en/download/).
- Parcel bundler installed globally on your machine. If you haven't installed Parcel yet, you can do so by running the following command:

```bash
npm install -g parcel-bundler
```

### Setup

1. Clone the repository to your local machine.

```bash
git clone https://github.com/frenchafgan/Assignment_1_Gomoku.git
```

2. Navigate to the project directory.

```bash
cd Assignment_1_Gomoku
```

3. Install the project dependencies.

```bash
npm install
```

### Running the game

Start the game locally by running the following command in your terminal:

```bash
npm run start
```

This command will start a local server and the game will be accessible an open port on the localhost ad indicated by parcel
in your browser e.g. `localhost:1234`.

## Game Rules

- Players take turns to place a stone of their color on an intersection of the board.
- The aim is to create a line of 5 stones of your color, horizontally, vertically, or diagonally.
- The game ends when one player has achieved this or if the board is completely filled without a line of 5, in which case the game is a draw.

## Bonus Feature

The scoreboard is a great feature as it will help you keep track of your game and make it a challenge to beat your your opponent. The scoreboard will display the number of wins for each player and the number of draws. Just above the scoreboard it also displays the current player's turn.

Enjoy the game!
