# Pokémon CLI Game

A simple command-line Pokémon battle game built with Node.js. Choose your Pokémon, battle against a bot, and see if you can win!

## Features

- Choose from a list of randomly fetched Pokémon from the PokéAPI.
- Battle against a bot that also selects a random Pokémon.
- Select from your Pokémon's moves, each with power, accuracy, and PP.
- Fight until one Pokémon faints and see the battle results.

## Prerequisites

Make sure you have Node.js installed on your system. If you don't have it installed, you can download it [here](https://nodejs.org).

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Hikaru-e/pokemon-cli-game.git
```

2. Navigate to the project folder:

```bash
cd pokemon-cli-game
```

3. Install the dependencies:

```bash
npm install
```

## How to Play

Once the dependencies are installed, you can start the game by running:

```bash
npm start
```

## Gameplay Instructions

1. The game will fetch a list of random Pokémon for you to choose from.
1. Select your Pokémon using the list prompt.
1. The bot will also select a random Pokémon to battle against you.
1. Each turn, you'll choose one of your Pokémon's moves from a list.
1. Both Pokémon will take turns attacking each other until one of them faints.

### Example

```bash
------------------ POKEMON GAME ------------------
? Choose your Pokemon: (Use arrow keys)
> Pikachu
  Bulbasaur
  Charmander
  Squirtle
  Jigglypuff
You are playing against Bulbasaur
Bulbasaur uses Tackle!
Pikachu used Thunderbolt and dealt 60 damage to Bulbasaur!
Bulbasaur's HP: 240
```

## Dependencies

- **prompts:** Used for the command-line selection prompts.
- **node-fetch:** Used to fetch Pokémon data from the PokéAPI.

## Project Structure

- **index.js:** The main game logic.
- **pokemonService.js:** Handles fetching Pokémon data and moves from the PokéAPI.
- **utils.js:** Utility functions for handling attacks and random selections.
